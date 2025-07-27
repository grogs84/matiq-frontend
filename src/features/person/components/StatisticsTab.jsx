/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import useWrestlerStats from '../hooks/useWrestlerStats.js';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';

/**
 * Statistics tab showing wrestler yearly performance data
 * @param {Object} props
 * @param {string} props.slug - Person slug
 */
function StatisticsTab({ slug }) {
  const { stats, loading, error } = useWrestlerStats(slug);
  const [selectedYear, setSelectedYear] = useState('all');

  const { filteredStats, availableYears, summaryStats } = useMemo(() => {
    if (!stats?.yearly_stats) {
      return { filteredStats: [], availableYears: [], summaryStats: {} };
    }

    const years = [...new Set(stats.yearly_stats.map(stat => stat.year))].sort((a, b) => b - a);
    const filtered = selectedYear === 'all' 
      ? stats.yearly_stats 
      : stats.yearly_stats.filter(stat => stat.year === parseInt(selectedYear));

    const summary = {
      totalWins: stats.yearly_stats.reduce((sum, stat) => sum + (stat.wins || 0), 0),
      bestPlacement: Math.min(...stats.yearly_stats.map(stat => stat.placement).filter(p => p != null)),
      totalYears: years.length,
      weightClasses: [...new Set(stats.yearly_stats.map(stat => stat.weight_class))].length
    };

    return { filteredStats: filtered, availableYears: years, summaryStats: summary };
  }, [stats, selectedYear]);

  if (loading) {
    return (
      <div className="statistics-tab">
        <LoadingSpinner />
        <p>Loading wrestler statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-tab error">
        <h3>Error Loading Statistics</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!stats?.yearly_stats || stats.yearly_stats.length === 0) {
    return (
      <div className="statistics-tab empty">
        <h3>No Statistics Available</h3>
        <p>No wrestling statistics found for this person.</p>
      </div>
    );
  }

  return (
    <div className="statistics-tab">
      <div className="statistics-header">
        <h2>Wrestling Statistics</h2>
        <div className="statistics-filters">
          <label htmlFor="year-filter">Filter by Year:</label>
          <select 
            id="year-filter"
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
        <div className="summary-stat">
          <span className="stat-value">{summaryStats.totalWins}</span>
          <span className="stat-label">Total Wins</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">
            {isFinite(summaryStats.bestPlacement) ? summaryStats.bestPlacement : 'N/A'}
          </span>
          <span className="stat-label">Best Placement</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">{summaryStats.totalYears}</span>
          <span className="stat-label">Years Active</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">{summaryStats.weightClasses}</span>
          <span className="stat-label">Weight Classes</span>
        </div>
      </div>

      <div className="statistics-table-container">
        <table className="statistics-table">
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
              <tr key={`${stat.year}-${stat.weight_class}-${index}`}>
                <td>{stat.year}</td>
                <td>{stat.weight_class}</td>
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