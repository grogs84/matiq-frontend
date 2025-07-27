/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';

function MatchesTab({ matches, loading, error, pagination, onFetch }) {
  const [filters, setFilters] = useState({
    year: 'all',
    result: 'all'
  });

  const handleFetch = (page = 1) => {
    onFetch(page, pagination.pageSize);
  };

  if (loading && !matches) {
    return (
      <div className="matches-tab">
        <div className="loading-spinner">Loading matches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-tab">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => handleFetch(1)} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="matches-tab">
        <div className="no-data">
          <p>No match history available</p>
          <button onClick={() => handleFetch(1)} className="fetch-button">
            Load Matches
          </button>
        </div>
      </div>
    );
  }

  // Filter matches based on selected filters
  const filteredMatches = matches.filter(match => {
    const yearMatch = filters.year === 'all' || match.year.toString() === filters.year;
    const resultMatch = filters.result === 'all' || 
      (filters.result === 'win' && match.is_winner) ||
      (filters.result === 'loss' && !match.is_winner);
    return yearMatch && resultMatch;
  });

  const availableYears = [...new Set(matches.map(match => match.year))].sort((a, b) => b - a);

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <div className="matches-tab">
      <div className="matches-header">
        <h3>Match History</h3>
        <div className="matches-info">
          Showing {filteredMatches.length} of {pagination.total} matches
        </div>
      </div>

      <div className="matches-filters">
        <div className="filter-group">
          <label>Year:</label>
          <select 
            value={filters.year} 
            onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
          >
            <option value="all">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Result:</label>
          <select 
            value={filters.result} 
            onChange={(e) => setFilters(prev => ({ ...prev, result: e.target.value }))}
          >
            <option value="all">All Results</option>
            <option value="win">Wins</option>
            <option value="loss">Losses</option>
          </select>
        </div>
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
              <tr key={index} className={match.is_winner ? 'win' : 'loss'}>
                <td>{match.year}</td>
                <td>{match.weight_class}</td>
                <td>{match.round}</td>
                <td>
                  {match.opponent_slug ? (
                    <Link to={`/person/${match.opponent_slug}`} className="opponent-link">
                      {match.opponent_name}
                    </Link>
                  ) : (
                    match.opponent_name
                  )}
                </td>
                <td>{match.opponent_school_name}</td>
                <td>
                  <span className={`result-badge ${match.is_winner ? 'win' : 'loss'}`}>
                    {match.is_winner ? 'Win' : 'Loss'}
                  </span>
                </td>
                <td>
                  <span className="score">{match.score}</span>
                  <span className="result-type">({match.result_type})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handleFetch(pagination.page - 1)}
            disabled={pagination.page <= 1 || loading}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {pagination.page} of {totalPages}
          </span>
          <button 
            onClick={() => handleFetch(pagination.page + 1)}
            disabled={pagination.page >= totalPages || loading}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default MatchesTab;