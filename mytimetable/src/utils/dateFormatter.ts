/**
 * Format a time string (e.g., "09:00") into a more readable format if needed.
 * For now, it just returns the string, but can be expanded for AM/PM etc.
 */
export const formatTime = (time: string): string => {
    if (!time) return '';
    
    // Example: Convert "13:00" to "1:00 PM"
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    
    return `${h12}:${minutes} ${ampm}`;
};

/**
 * Format date/day strings
 */
export const formatDay = (day: string): string => {
    return day.charAt(0).toUpperCase() + day.slice(1);
};
