// Format date to display in a user-friendly way
export const formatDate = (date: Date | null | undefined): string => {
  if (!date) return 'No date';
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // Check if it's today or tomorrow
  if (dateOnly.getTime() === today.getTime()) {
    return `Today at ${formatTime(date)}`;
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    return `Tomorrow at ${formatTime(date)}`;
  }
  
  // Check if it's within the next 7 days
  const daysDiff = Math.floor((dateOnly.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 0 && daysDiff < 7) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]} at ${formatTime(date)}`;
  }
  
  // Otherwise, return the full date
  return `${date.toLocaleDateString()} at ${formatTime(date)}`;
};

// Format time in 12-hour format
export const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
};

// Get relative time (e.g., "2 hours ago", "3 days ago")
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDay < 30) {
    return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

// Check if a date is in the past
export const isPastDue = (date: Date | null | undefined): boolean => {
  if (!date) return false;
  return date.getTime() < Date.now();
};

// Check if a date is today
export const isToday = (date: Date | null | undefined): boolean => {
  if (!date) return false;
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};