/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

// Utility function to convert text to title case
const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * SearchSuggestions component - displays dropdown suggestions for search
 * @component
 * @param {Array} suggestions - Array of suggestion objects
 * @param {boolean} isLoading - Whether suggestions are loading
 * @param {boolean} showDropdown - Whether to show the dropdown
 * @param {Function} onSuggestionClick - Callback when suggestion is clicked
 * @param {Function} onSearch - Callback for search functionality
 * @returns {JSX.Element|null} The SearchSuggestions component
 */
function SearchSuggestions({ suggestions, isLoading, showDropdown, onSuggestionClick, onSearch }) {
  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion) => {
    console.log('🖱️ Clicked suggestion:', suggestion); // Debug log
    
    // Navigate to profile page for persons, otherwise do search
    if (suggestion.result_type === 'person') {
      const slug = suggestion.slug;
      console.log('🆔 Using slug for navigation:', slug);
      navigate(`/person/${slug}`);
    } else {
      const query = suggestion.search_name || suggestion.name;
      onSearch(query);
    }
    onSuggestionClick(suggestion);
  };

  if (!showDropdown) {
    return null;
  }

  return (
    <div className="absolute top-full left-4 right-4 sm:left-0 sm:right-0 mt-2 glass border border-neutral-200/50 dark:border-neutral-700/50 rounded-xl sm:rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto animate-slide-down">
      {isLoading ? (
        <div className="flex items-center justify-center py-6 text-neutral-600 dark:text-neutral-400">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-300 dark:border-neutral-600 border-t-primary-600 mr-3"></div>
          <span className="loading-dots">Searching</span>
        </div>
      ) : suggestions.length > 0 ? (
        <>
          {suggestions.map((suggestion, index) => (
            <div
              key={`suggestion-${index}`}
              className="px-4 py-3 hover:bg-neutral-50/80 dark:hover:bg-neutral-700/50 cursor-pointer border-b border-neutral-100/50 dark:border-neutral-700/50 last:border-b-0 transition-all duration-200 group"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center justify-between">
                <span className="text-neutral-800 dark:text-neutral-200 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {toTitleCase(suggestion.search_name || suggestion.name)}
                </span>
                <div className="flex flex-wrap gap-1">
                  {suggestion.result_type === 'person' ? (
                    suggestion.roles && suggestion.roles.length > 0 ? (
                      suggestion.roles.map((role, roleIndex) => (
                        <span key={roleIndex} className="badge-primary">
                          {toTitleCase(role)}
                        </span>
                      ))
                    ) : (
                      <span className="badge-primary">Person</span>
                    )
                  ) : (
                    <span className="badge-secondary">
                      {toTitleCase(suggestion.result_type)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="px-4 py-6 text-neutral-500 dark:text-neutral-400 text-center">
          <div className="text-2xl mb-2">🔍</div>
          <div>No suggestions found</div>
        </div>
      )}
    </div>
  );
}

export default SearchSuggestions;