/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useWrestlerMatches from '../hooks/useWrestlerMatches.js';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';
import Button from '../../../components/ui/Button.jsx';
import { toTitleCase } from '../../../utils/textUtils.js';

/**
 * Matches tab showing wrestler match history with pagination
 * @param {Object} props
 * @param {string} props.slug - Person slug
 */
function MatchesTab({ slug }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [yearFilter, setYearFilter] = useState('all');
  const [resultFilter, setResultFilter] = useState('all');
  const pageSize = 20;
  
  const { matches, total, loading, error } = useWrestlerMatches(slug, currentPage, pageSize);
  const navigate = useNavigate();

  const { filteredMatches, availableYears } = useMemo(() => {
    if (!matches) {
      return { filteredMatches: [], availableYears: [] };
    }

    const years = [...new Set(matches.map(match => match.year))].sort((a, b) => b - a);
    
    let filtered = matches;
    
    if (yearFilter !== 'all') {
      filtered = filtered.filter(match => match.year === parseInt(yearFilter));
    }
    
    if (resultFilter !== 'all') {
      filtered = filtered.filter(match => {
        return resultFilter === 'win' ? match.is_winner : !match.is_winner;
      });
    }

    return { filteredMatches: filtered, availableYears: years };
  }, [matches, yearFilter, resultFilter]);

  const totalPages = Math.ceil(total / pageSize);

  const handleOpponentClick = (opponentSlug) => {
    if (opponentSlug) {
      navigate(`/person/${opponentSlug}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading match history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <h3 className="text-lg font-semibold text-error-600 dark:text-error-400 mb-2">Error Loading Matches</h3>
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="card p-8 text-center">
        <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400 mb-2">No Matches Available</h3>
        <p className="text-neutral-500 dark:text-neutral-500">No match history found for this wrestler.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-ncaa-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          Match History
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="year-filter" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Year:
            </label>
            <select 
              id="year-filter"
              value={yearFilter} 
              onChange={(e) => setYearFilter(e.target.value)}
              className="input-field min-w-[120px]"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="result-filter" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Result:
            </label>
            <select 
              id="result-filter"
              value={resultFilter} 
              onChange={(e) => setResultFilter(e.target.value)}
              className="input-field min-w-[120px]"
            >
              <option value="all">All Results</option>
              <option value="win">Wins</option>
              <option value="loss">Losses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Match Count Info */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing <span className="font-medium">{filteredMatches.length}</span> of <span className="font-medium">{total}</span> matches
      </div>

      {/* Matches Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Round</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Opponent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">School</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredMatches.map((match, index) => (
                <tr key={`${match.year}-${match.round}-${index}`} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">
                    {match.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {match.weight_class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {match.round}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.opponent_slug ? (
                      <button
                        className="text-sm font-medium text-ncaa-blue hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                        onClick={() => handleOpponentClick(match.opponent_slug)}
                      >
                        {toTitleCase(match.opponent_name)}
                      </button>
                    ) : (
                      <span className="text-sm text-neutral-900 dark:text-white">{toTitleCase(match.opponent_name)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {toTitleCase(match.opponent_school_name)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      match.is_winner 
                        ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300'
                        : 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300'
                    }`}>
                      {match.is_winner ? 'Win' : 'Loss'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-neutral-900 dark:text-white">{match.score}</div>
                      <div className="text-neutral-500 dark:text-neutral-400">({match.result_type})</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700 pt-6">
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            variant="secondary"
            size="sm"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            }
          >
            Previous
          </Button>
          
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </div>
          
          <Button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            variant="secondary"
            size="sm"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            }
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default MatchesTab;