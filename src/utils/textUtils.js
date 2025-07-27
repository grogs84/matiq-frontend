/**
 * Utility function to convert text to title case
 * @param {string} str - The string to convert
 * @returns {string} The title cased string
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Format location string with title case
 * @param {string} city - City name
 * @param {string} state - State name
 * @returns {string} Formatted location string
 */
export const formatLocation = (city, state) => {
  const parts = [city, state].filter(Boolean).map(toTitleCase);
  return parts.join(', ');
};

export default { toTitleCase, formatLocation };
