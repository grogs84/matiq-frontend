/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { getTournamentStats } from '../utils/dataTransformation.js';

/**
 * ResultsView component for displaying tournament results in table format
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.tournamentData - Tournament data to display
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message if any
 */
function ResultsView({ tournamentData, isLoading = false, error = null }) {
  // Extract all matches from tournament data
  const matches = useMemo(() => {
    if (!tournamentData?.matches) return [];
    
    return tournamentData.matches.map((match) => {
      const isCompleted = match.state === 'DONE' || match.state === 'SCORE_DONE';
      const winner = isCompleted && match.participants
        ? match.participants.find(p => p.isWinner)
        : null;
      
      return {
        id: match.id,
        name: match.name,
        round: `Round ${match.tournamentRoundText}`,
        roundIndex: parseInt(match.tournamentRoundText) || 1,
        participant1: match.participants?.[0],
        participant2: match.participants?.[1],
        isCompleted,
        winner,
        state: match.state,
        startTime: match.startTime
      };
    });
  }, [tournamentData]);

  const stats = useMemo(() => {
    return getTournamentStats(tournamentData);
  }, [tournamentData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading tournament results...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Error Loading Results
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-neutral-400 text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            No Results Available
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Tournament results will appear here once matches are completed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-view">
      {/* Tournament Summary */}
      {tournamentData?.tournament && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Tournament Results
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stats.totalMatches}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Matches</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">{stats.completedMatches}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Completed</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{stats.remainingMatches}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Remaining</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{stats.totalRounds}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Rounds</div>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Match Results</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Round
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {match.round}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900 dark:text-neutral-100">
                    <div className="space-y-1">
                      <div className={`flex justify-between items-center ${match.winner?.id === match.participant1?.id ? 'font-semibold text-green-600 dark:text-green-400' : ''}`}>
                        <span className="truncate">{match.participant1?.name || 'TBD'}</span>
                        <span className="ml-2 font-mono">{match.participant1?.resultText || '-'}</span>
                      </div>
                      <div className={`flex justify-between items-center ${match.winner?.id === match.participant2?.id ? 'font-semibold text-green-600 dark:text-green-400' : ''}`}>
                        <span className="truncate">{match.participant2?.name || 'TBD'}</span>
                        <span className="ml-2 font-mono">{match.participant2?.resultText || '-'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                    {match.isCompleted ? (
                      <span className="font-mono">
                        {match.participant1?.resultText} - {match.participant2?.resultText}
                      </span>
                    ) : (
                      <span className="text-neutral-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.isCompleted ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {match.state === 'SCHEDULED' ? 'Scheduled' : 'Pending'}
                      </span>
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

export default ResultsView;