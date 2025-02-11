import { NavLink } from "react-router-dom";

const navItems = [
  { title: "HOME", href: "/" },
  { title: "WORLD", href: "/world" },
  { title: "US", href: "/us" },
  { title: "MARKETS", href: "/markets" },
  { title: "CLIMATE", href: "/climate" },
];

export function MainNav() {
  return (
    <nav className="border-b bg-white">
      <div className="container px-4">
        <div className="flex h-12 items-center space-x-6 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "border-b-2 border-[#990F3D] text-[#990F3D]"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
