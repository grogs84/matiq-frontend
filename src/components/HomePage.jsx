import SearchResults from './SearchResults.jsx';
import SearchHero from './SearchHero.jsx';
import BrowseCards from './BrowseCards.jsx';
import HealthCheck from './HealthCheck.jsx';
import useSearch from '../hooks/useSearch.js';

/**
 * HomePage component - main landing page with search functionality
 * @component
 * @returns {JSX.Element} The HomePage component
 */
function HomePage() {
  // Use search hook for all search functionality
  const { searchResults, isSearching, searchError, currentQuery, showResults, search, lookAhead } = useSearch();

  return (
    <div className="min-h-screen hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Search */}
        <SearchHero onSearch={search} onLookAhead={lookAhead} />

        {/* Search Results */}
        {showResults && (
          <section className="pb-12">
            <SearchResults 
              results={searchResults}
              isLoading={isSearching}
              error={searchError}
              query={currentQuery}
            />
          </section>
        )}

        {/* Browse Cards - shown when no search results */}
        <BrowseCards showResults={showResults} />

        {/* Health Check */}
        <HealthCheck />
      </div>
    </div>
  );
}

export default HomePage;
