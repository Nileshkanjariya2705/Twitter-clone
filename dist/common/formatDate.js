"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeAgo = timeAgo;
/**
 * Calculates a human-readable relative time string.
 * @param {string | Date} date - The UTC timestamp from the database
 */
function timeAgo(date) {
    if (!date)
        return "long ago";
    // Ensure we are working with timestamps (numbers) for calculation
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    // Calculate difference in seconds
    const seconds = Math.floor((now - past) / 1000);
    if (seconds < 60)
        return "just now";
    const intervals = {
        yr: 31536000,
        mth: 2592000,
        day: 86400,
        hr: 3600,
        min: 60
    };
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const counter = Math.floor(seconds / secondsInUnit);
        if (counter >= 1) {
            return `${counter}${unit} ago`; // Clean "1hr ago" style
        }
    }
    return "just now";
}
//# sourceMappingURL=formatDate.js.map