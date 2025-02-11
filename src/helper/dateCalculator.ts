export const calculateTimeFromNow = (dateString: string) => {
  const givenDate = new Date(dateString);

  if (isNaN(givenDate.getTime())) {
    console.error("Invalid date format:", dateString);
    return "Invalid date";
  }

  const now = new Date();
  const diffInMilliseconds = givenDate.getTime() - now.getTime();
  const isPast = diffInMilliseconds < 0;

  const diffInMinutes = Math.abs(Math.round(diffInMilliseconds / (1000 * 60)));
  const diffInHours = Math.abs(
    Math.round(diffInMilliseconds / (1000 * 60 * 60))
  );
  const diffInDays = Math.abs(
    Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24))
  );

  if (diffInMinutes < 1) {
    return isPast ? "Just now" : "In less than a minute";
  } else if (diffInMinutes < 60) {
    return isPast
      ? `${diffInMinutes} minutes ago`
      : `In ${diffInMinutes} minutes`;
  } else if (diffInHours < 24) {
    return isPast ? `${diffInHours} hours ago` : `In ${diffInHours} hours`;
  } else {
    return isPast
      ? `${diffInDays} ${diffInDays > 1 ? "days" : "day"}  ago`
      : `In ${diffInDays} days`;
  }
};
