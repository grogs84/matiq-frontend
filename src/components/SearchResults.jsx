/* eslint-disable react/prop-types */
/**
 * SearchResults Component
 * Displays search results for persons, schools, and tournaments
 */

// Utility function to convert text to title case
const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function SearchResultItem({ result, onResultClick }) {
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
    if (onResultClick) {
      onResultClick(result);
    }
  };

  return (
    <div 
      className={`card-hover p-4 group transition-all duration-300 ${
        result.result_type === 'person' 
          ? 'cursor-pointer hover:shadow-glow hover:border-primary-300 dark:hover:border-primary-600' 
          : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-4">
        <div className="text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          {getIcon(result.result_type)}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
              {toTitleCase(result.search_name || result.name || 'Unknown')}
            </h3>
            <div className="flex flex-wrap gap-1">
              {result.result_type === 'person' ? (
                result.roles && result.roles.length > 0 ? (
                  result.roles.map((role, roleIndex) => (
                    <span key={roleIndex} className="badge-primary whitespace-nowrap">
                      {toTitleCase(role)}
                    </span>
                  ))
                ) : (
                  <span className="badge-primary">Person</span>
                )
              ) : (
                <span className="badge-secondary whitespace-nowrap">
                  {getTypeLabel(result.result_type, result)}
                </span>
              )}
            </div>
          </div>
          {result.metadata && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{toTitleCase(result.metadata)}</p>
          )}
          {result.primary_display && result.primary_display !== (result.search_name || result.name) && (
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{toTitleCase(result.primary_display)}</p>
          )}
          {result.result_type === 'person' && (
            <div className="mt-2 flex items-center text-xs text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>Click to view profile</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchResults({ results, isLoading, error, query, onResultClick }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-200 dark:border-neutral-700 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400 loading-dots">Searching</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800/30 p-6 text-center">
        <div className="text-error-600 dark:text-error-400 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-error-800 dark:text-error-300 mb-2">Search failed</h3>
        <p className="text-error-700 dark:text-error-400 mb-4">{error.message}</p>
        <button 
          className="btn-accent btn-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const { results: items, total_results, query: searchQuery } = results;

  if (total_results === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="text-neutral-400 dark:text-neutral-500 text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">No results found</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">No matches found for &ldquo;{query || searchQuery}&rdquo;</p>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">Try searching with different keywords or check your spelling.</p>
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
    <div className="space-y-6 sm:space-y-8">
      <div className="card p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">Search Results</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Found <span className="font-semibold text-primary-600 dark:text-primary-400">{total_results}</span> result{total_results !== 1 ? 's' : ''} for &ldquo;{toTitleCase(query || searchQuery)}&rdquo;
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Persons */}
        {groupedResults.person && (
          <div className="animate-slide-up">
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2 text-xl sm:text-2xl">🤼</span>
              Wrestlers <span className="badge-primary ml-2">{groupedResults.person.length}</span>
            </h3>
            <div className="space-y-3">
              {groupedResults.person.map((result, index) => (
                <SearchResultItem key={`person-${index}`} result={result} onResultClick={onResultClick} />
              ))}
            </div>
          </div>
        )}

        {/* Schools */}
        {groupedResults.school && (
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2 text-xl sm:text-2xl">🏫</span>
              Schools <span className="badge-primary ml-2">{groupedResults.school.length}</span>
            </h3>
            <div className="space-y-3">
              {groupedResults.school.map((result, index) => (
                <SearchResultItem key={`school-${index}`} result={result} onResultClick={onResultClick} />
              ))}
            </div>
          </div>
        )}

        {/* Tournaments */}
        {groupedResults.tournament && (
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2 text-xl sm:text-2xl">🏆</span>
              Tournaments <span className="badge-primary ml-2">{groupedResults.tournament.length}</span>
            </h3>
            <div className="space-y-3">
              {groupedResults.tournament.map((result, index) => (
                <SearchResultItem key={`tournament-${index}`} result={result} onResultClick={onResultClick} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
