import React, { useEffect, useState } from "react";

const MarketInfoBar: React.FC = () => {
  // ✅ State for Market Times & Status
  const [nyseTime, setNyseTime] = useState<string>("Loading...");
  const [lseTime, setLseTime] = useState<string>("Loading...");
  const [tseTime, setTseTime] = useState<string>("Loading...");
  const [nyseStatus, setNyseStatus] = useState<string>("Checking...");
  const [lseStatus, setLseStatus] = useState<string>("Checking...");
  const [tseStatus, setTseStatus] = useState<string>("Checking...");

  // ✅ State for Weather & Date
  const [weather, setWeather] = useState<React.ReactNode>("Weather: Loading...");
  const [currentDate, setCurrentDate] = useState<string>(new Date().toDateString());

  useEffect(() => {
    // ✅ Function to Update Market Status
    const updateMarketStatus = (
      setTime: React.Dispatch<React.SetStateAction<string>>, 
      setStatus: React.Dispatch<React.SetStateAction<string>>, 
      openHour: number, 
      openMin: number, 
      closeHour: number, 
      closeMin: number, 
      timezone: string
    ) => {
      const now = new Date();
      const day: number = now.getUTCDay();
      const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", timeZone: timezone };

      setTime(now.toLocaleTimeString([], options));

      const isOpen: boolean =
        day >= 1 && day <= 5 &&
        ((now.getUTCHours() > openHour || (now.getUTCHours() === openHour && now.getUTCMinutes() >= openMin)) &&
          (now.getUTCHours() < closeHour || (now.getUTCHours() === closeHour && now.getUTCMinutes() < closeMin)));

      setStatus(isOpen ? "🟢 OPEN" : "🔴 CLOSED");
    };

    // ✅ Function to Fetch Weather
    const fetchWeather = async () => {
        const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const location = "London";
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${weatherApiKey}`);
        const data = await response.json();
        const temp: number = data.main.temp;
        const description: string = data.weather[0].description
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        const iconUrl: string = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        setWeather(
          <div className="flex items-center gap-2">
            <img src={iconUrl} alt={description} className="w-8 h-8" />
            <span className="text-white text-sm">{temp}°C, {description}</span>
          </div>
        );
      } catch (error: unknown) {
        console.error("Weather fetch error:", error);
        setWeather("Weather: Failed to load");
      }
      
    };

    // ✅ Update Markets & Weather Every Minute
    const updateAll = () => {
      updateMarketStatus(setNyseTime, setNyseStatus, 14, 30, 21, 0, "America/New_York");
      updateMarketStatus(setLseTime, setLseStatus, 8, 0, 16, 30, "Europe/London");
      updateMarketStatus(setTseTime, setTseStatus, 0, 0, 6, 0, "Asia/Tokyo");
      setCurrentDate(new Date().toDateString());
      fetchWeather();
    };

    updateAll();
    const interval = setInterval(updateAll, 60000); // Refresh every 60s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-stone-950 text-white text-xs py-[2px]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* ✅ Market Time & Status */}
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1">
            <span>NYSE-Time: {nyseTime}</span>
            <span>{nyseStatus}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>LSE-Time: {lseTime}</span>
            <span>{lseStatus}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>TSE-Time: {tseTime}</span>
            <span>{tseStatus}</span>
          </div>
        </div>

        {/* ✅ Weather & Date */}
        <div className="flex items-center space-x-3">
          <span>{weather}</span>
          <span>{currentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketInfoBar;
