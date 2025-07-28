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
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading wrestler statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <h3 className="text-lg font-semibold text-error-600 dark:text-error-400 mb-2">Error Loading Statistics</h3>
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  if (!stats?.yearly_stats || stats.yearly_stats.length === 0) {
    return (
      <div className="card p-8 text-center">
        <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400 mb-2">No Statistics Available</h3>
        <p className="text-neutral-500 dark:text-neutral-500">This wrestler doesn&apos;t have any recorded statistics yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-ncaa-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Wrestling Statistics
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="year-filter" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Filter by Year:
          </label>
          <select 
            id="year-filter"
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="input-field min-w-[120px]"
          >
            <option value="all">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-ncaa-blue dark:text-primary-400 mb-2">
            {summaryStats.totalWins}
          </div>
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Wins</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-ncaa-gold dark:text-accent-400 mb-2">
            {isFinite(summaryStats.bestPlacement) ? summaryStats.bestPlacement : 'N/A'}
          </div>
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Best Placement</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-ncaa-orange dark:text-secondary-400 mb-2">
            {summaryStats.totalYears}
          </div>
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Years Active</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
            {summaryStats.weightClasses}
          </div>
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Weight Classes</div>
        </div>
      </div>

      {/* Statistics Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Yearly Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Weight Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Wins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Placement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredStats.map((stat, index) => (
                <tr key={`${stat.year}-${stat.weight_class}-${index}`} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">
                    {stat.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.weight_class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300">
                      {stat.wins || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {stat.placement ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stat.placement <= 3 
                          ? 'bg-ncaa-gold/20 text-ncaa-orange dark:bg-accent-900/20 dark:text-accent-300'
                          : stat.placement <= 8
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                          : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                      }`}>
                        {stat.placement}
                      </span>
                    ) : (
                      <span className="text-sm text-neutral-400 dark:text-neutral-500">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatisticsTab;