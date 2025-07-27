/* eslint-disable react/prop-types */
/**
 * SearchResults Component
 * Displays search results for persons, schools, and tournaments
 */

import { useNavigate } from 'react-router-dom';

// Utility function to convert text to title case
const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function SearchResultItem({ result }) {
  const navigate = useNavigate();
  const getIcon = (type) => {
    switch (type) {
      case 'person': return '🤼';
      case 'school': return '🏫';
      case 'tournament': return '🏆';
      default: return '📄';
    }
  };

  const getTypeLabel = (type, result) => {
    switch (type) {
      case 'person': 
        // For persons, show their role if available, otherwise default to 'Person'
        if (result.roles && result.roles.length > 0) {
          return toTitleCase(result.roles[0]);
        }
        return 'Person';
      case 'school': return 'School';
      case 'tournament': return 'Tournament';
      default: return 'Result';
    }
  };

  const handleClick = () => {
    console.log('🖱️ Clicked search result:', result); // Debug log
    
    // Navigate to profile page for persons
    if (result.result_type === 'person') {
      // Use the person_id if available, otherwise generate a dummy ID based on name
      // const id = result.person_id || btoa(result.search_name || result.name).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
      const slug = result.slug;
      console.log('🆔 Using slug for navigation:', slug); // Debug log
      navigate(`/person/${slug}`);
    }
  };

  return (
    <div 
      className={`search-result-item ${result.result_type === 'person' ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="result-icon">
        {getIcon(result.result_type)}
      </div>
      <div className="result-content">
        <div className="result-header">
          <h3 className="result-title">
            {toTitleCase(result.search_name || result.name || 'Unknown')}
          </h3>
          <div className="result-badges">
            {result.result_type === 'person' ? (
              result.roles && result.roles.length > 0 ? (
                result.roles.map((role, roleIndex) => (
                  <span key={roleIndex} className="result-type-badge">
                    {toTitleCase(role)}
                  </span>
                ))
              ) : (
                <span className="result-type-badge">Person</span>
              )
            ) : (
              <span className="result-type-badge">
                {getTypeLabel(result.result_type, result)}
              </span>
            )}
          </div>
        </div>
        {result.metadata && (
          <p className="result-metadata">{toTitleCase(result.metadata)}</p>
        )}
        {result.primary_display && result.primary_display !== (result.search_name || result.name) && (
          <p className="result-display">{toTitleCase(result.primary_display)}</p>
        )}
      </div>
    </div>
  );
}

function SearchResults({ results, isLoading, error, query }) {
  if (isLoading) {
    return (
      <div className="search-results loading">
        <div className="search-status">
          <div className="loading-spinner"></div>
          <p>Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results error">
        <div className="search-status">
          <div className="error-icon">⚠️</div>
          <p>Search failed: {error.message}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const { results: items, total_results, query: searchQuery } = results;

  if (total_results === 0) {
    return (
      <div className="search-results empty">
        <div className="search-status">
          <div className="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>No matches found for &quot;{query || searchQuery}&quot;</p>
          <p>Try searching with different keywords or check your spelling.</p>
        </div>
      </div>
    );
  }

  // Group results by type
  const groupedResults = items.reduce((acc, item) => {
    const type = item.result_type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});

  return (
    <div className="search-results">
      <div className="search-summary">
        <h2>Search Results</h2>
        <p>
          Found {total_results} result{total_results !== 1 ? 's' : ''} for &quot;{toTitleCase(query || searchQuery)}&quot;
        </p>
      </div>

      <div className="results-container">
        {/* Persons */}
        {groupedResults.person && (
          <div className="result-section">
            <h3 className="section-title">
              🤼 Wrestlers ({groupedResults.person.length})
            </h3>
            <div className="result-list">
              {groupedResults.person.map((result, index) => (
                <SearchResultItem key={`person-${index}`} result={result} />
              ))}
            </div>
          </div>
        )}

        {/* Schools */}
        {groupedResults.school && (
          <div className="result-section">
            <h3 className="section-title">
              🏫 Schools ({groupedResults.school.length})
            </h3>
            <div className="result-list">
              {groupedResults.school.map((result, index) => (
                <SearchResultItem key={`school-${index}`} result={result} />
              ))}
            </div>
          </div>
        )}

        {/* Tournaments */}
        {groupedResults.tournament && (
          <div className="result-section">
            <h3 className="section-title">
              🏆 Tournaments ({groupedResults.tournament.length})
            </h3>
            <div className="result-list">
              {groupedResults.tournament.map((result, index) => (
                <SearchResultItem key={`tournament-${index}`} result={result} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
