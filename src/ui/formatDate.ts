export const formatDate = (timestamp: string): string => {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);

  const elapsedMilliseconds = currentDate.getTime() - previousDate.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedMonths / 12);

  if (elapsedYears > 0) {
    return elapsedYears === 1 ? "1 year ago" : `${elapsedYears} years ago`;
  } else if (elapsedMonths > 0) {
    return elapsedMonths === 1 ? "1 month ago" : `${elapsedMonths} months ago`;
  } else if (elapsedDays > 0) {
    return elapsedDays === 1 ? "1 day ago" : `${elapsedDays} days ago`;
  } else if (elapsedHours > 0) {
    return elapsedHours === 1 ? "1 hour ago" : `${elapsedHours} hours ago`;
  } else if (elapsedMinutes > 0) {
    return elapsedMinutes === 1
      ? "1 minute ago"
      : `${elapsedMinutes} minutes ago`;
  } else {
    return "just now";
  }
};
