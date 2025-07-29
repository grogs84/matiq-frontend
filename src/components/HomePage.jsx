import SearchResults from './SearchResults.jsx';
import SearchHero from './SearchHero.jsx';
import SearchBar from './SearchBar.jsx';
import BrowseCards from './BrowseCards.jsx';
import HealthCheck from './HealthCheck.jsx';
import Layout from './common/Layout.jsx';
import useSearch from '../hooks/useSearch.js';

/**
 * HomePage component - main landing page with search functionality
 * @component
 * @returns {JSX.Element} The HomePage component
 */
function HomePage() {
  // Use search hook for all search functionality - single source of truth
  const {
    // Main search state
    searchResults,
    isSearching,
    searchError,
    currentQuery,
    showResults,
    
    // Input and suggestions state
    inputValue,
    suggestions,
    showDropdown,
    isLoadingSuggestions,
    
    // Refs
    dropdownRef,
    
    // Action functions
    handleInputChange,
    handleSubmit,
    handleSuggestionClick,
    handleResultClick,
    handleClear
  } = useSearch();

  // Props to pass to SearchBar via SearchHero
  const searchProps = {
    inputValue,
    suggestions,
    showDropdown,
    isLoadingSuggestions,
    dropdownRef,
    handleInputChange,
    handleSubmit,
    handleSuggestionClick,
    handleClear
  };

  return (
    <Layout background="gradient">
      {/* Hero Section with Search - using children composition pattern */}
      <SearchHero>
        <SearchBar {...searchProps} />
      </SearchHero>

      {/* Search Results */}
      {showResults && (
        <section className="pb-12">
          <SearchResults 
            results={searchResults}
            isLoading={isSearching}
            error={searchError}
            query={currentQuery}
            onResultClick={handleResultClick}
          />
        </section>
      )}

      {/* Browse Cards - shown when no search results */}
      <BrowseCards showResults={showResults} />

      {/* Health Check */}
      <HealthCheck />
    </Layout>
  );
}

export default HomePage;
