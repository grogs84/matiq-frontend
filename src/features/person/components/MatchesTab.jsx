/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useWrestlerMatches from '../hooks/useWrestlerMatches.js';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';

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
      <div className="matches-tab">
        <LoadingSpinner />
        <p>Loading match history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-tab error">
        <h3>Error Loading Matches</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="matches-tab empty">
        <h3>No Matches Available</h3>
        <p>No match history found for this wrestler.</p>
      </div>
    );
  }

  return (
    <div className="matches-tab">
      <div className="matches-header">
        <h2>Match History</h2>
        <div className="matches-filters">
          <div className="filter-group">
            <label htmlFor="year-filter">Year:</label>
            <select 
              id="year-filter"
              value={yearFilter} 
              onChange={(e) => setYearFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="result-filter">Result:</label>
            <select 
              id="result-filter"
              value={resultFilter} 
              onChange={(e) => setResultFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Results</option>
              <option value="win">Wins</option>
              <option value="loss">Losses</option>
            </select>
          </div>
        </div>
      </div>

      <div className="matches-info">
        <p>Showing {filteredMatches.length} of {total} matches</p>
      </div>

      <div className="matches-table-container">
        <table className="matches-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Weight Class</th>
              <th>Round</th>
              <th>Opponent</th>
              <th>Opponent School</th>
              <th>Result</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((match, index) => (
              <tr key={`${match.year}-${match.round}-${index}`}>
                <td>{match.year}</td>
                <td>{match.weight_class}</td>
                <td>{match.round}</td>
                <td>
                  {match.opponent_slug ? (
                    <button
                      className="opponent-link"
                      onClick={() => handleOpponentClick(match.opponent_slug)}
                    >
                      {match.opponent_name}
                    </button>
                  ) : (
                    <span>{match.opponent_name}</span>
                  )}
                </td>
                <td>{match.opponent_school_name}</td>
                <td>
                  <span className={`result-badge ${match.is_winner ? 'win' : 'loss'}`}>
                    {match.is_winner ? 'Win' : 'Loss'}
                  </span>
                </td>
                <td>
                  <div className="score-info">
                    <span className="score">{match.score}</span>
                    <span className="result-type">({match.result_type})</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <button 
            className="pagination-button"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default MatchesTab;