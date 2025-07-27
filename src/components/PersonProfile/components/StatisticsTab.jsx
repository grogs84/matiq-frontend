/* eslint-disable react/prop-types */
import { useState } from 'react';

function StatisticsTab({ stats, loading, error, onFetch }) {
  const [selectedYear, setSelectedYear] = useState('all');

  if (loading) {
    return (
      <div className="statistics-tab">
        <div className="loading-spinner">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-tab">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={onFetch} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stats || !stats.yearly_stats || stats.yearly_stats.length === 0) {
    return (
      <div className="statistics-tab">
        <div className="no-data">
          <p>No wrestling statistics available</p>
          <button onClick={onFetch} className="fetch-button">
            Load Statistics
          </button>
        </div>
      </div>
    );
  }

  const filteredStats = selectedYear === 'all' 
    ? stats.yearly_stats 
    : stats.yearly_stats.filter(stat => stat.year.toString() === selectedYear);

  const availableYears = [...new Set(stats.yearly_stats.map(stat => stat.year))].sort((a, b) => b - a);

  // Calculate summary statistics
  const totalWins = stats.yearly_stats.reduce((sum, stat) => sum + (stat.wins || 0), 0);
  const bestPlacement = Math.min(...stats.yearly_stats.map(stat => stat.placement).filter(p => p != null));

  return (
    <div className="statistics-tab">
      <div className="stats-header">
        <h3>Wrestling Statistics</h3>
        <div className="stats-filters">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="year-filter"
          >
            <option value="all">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-stats">
        <div className="summary-item">
          <span className="summary-value">{totalWins}</span>
          <span className="summary-label">Total Wins</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">{isFinite(bestPlacement) ? bestPlacement : 'N/A'}</span>
          <span className="summary-label">Best Placement</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">{stats.yearly_stats.length}</span>
          <span className="summary-label">Years Active</span>
        </div>
      </div>

      <div className="stats-table-container">
        <table className="stats-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Weight Class</th>
              <th>Wins</th>
              <th>Placement</th>
            </tr>
          </thead>
          <tbody>
            {filteredStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.year}</td>
                <td>{stat.weight_class}kg</td>
                <td>{stat.wins || 0}</td>
                <td>{stat.placement || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatisticsTab;