/* eslint-disable react/prop-types */
import SearchSuggestions from './SearchSuggestions.jsx';
import { Button } from '../../../components/ui';

/**
 * SearchBar component - provides search input with suggestions dropdown
 * Now receives all state and handlers as props from parent using useSearch hook
 * @component
 * @param {string} inputValue - Current input value
 * @param {Array} suggestions - Array of suggestions
 * @param {boolean} showDropdown - Whether to show suggestions dropdown
 * @param {boolean} isLoadingSuggestions - Whether suggestions are loading
 * @param {React.RefObject} dropdownRef - Ref for dropdown element
 * @param {Function} handleInputChange - Input change handler
 * @param {Function} handleSubmit - Form submit handler
 * @param {Function} handleSuggestionClick - Suggestion click handler
 * @param {Function} handleClear - Clear input handler
 * @returns {JSX.Element} The SearchBar component
 */
function SearchBar({ 
  inputValue, 
  suggestions, 
  showDropdown, 
  isLoadingSuggestions, 
  dropdownRef, 
  handleInputChange, 
  handleSubmit, 
  handleSuggestionClick, 
  handleClear 
}) {

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-0" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search wrestlers, schools, coaches, or tournaments..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-20 sm:pr-24 text-base sm:text-lg border-2 border-neutral-300 dark:border-neutral-600 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-glow"
            autoComplete="off"
          />
          {inputValue && (
            <button 
              type="button" 
              onClick={handleClear}
              className="absolute right-16 sm:right-20 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-xl w-6 h-6 flex items-center justify-center transition-colors duration-200"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:shadow-glow"
            size="sm"
            variant="primary"
          >
            <span className="hidden sm:inline">Search</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>
        </div>
      </form>
      
      <SearchSuggestions 
        suggestions={suggestions}
        isLoading={isLoadingSuggestions}
        showDropdown={showDropdown}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
}

export default SearchBar;