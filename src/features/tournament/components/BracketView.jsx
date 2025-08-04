/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { SingleEliminationBracket } from '@g-loot/react-tournament-brackets';
import { transformTournamentData, validateTournamentData, getTournamentStats } from '../utils/dataTransformation.js';

/**
 * BracketView component for displaying tournament brackets
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.tournamentData - Tournament data to display
 * @param {Function} props.onMatchClick - Callback for match click events
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message if any
 */
function BracketView({ tournamentData, onMatchClick, isLoading = false, error = null }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Transform and validate data
  const bracketData = useMemo(() => {
    if (!tournamentData) return [];
    return transformTournamentData(tournamentData);
  }, [tournamentData]);

  const validation = useMemo(() => {
    return validateTournamentData(tournamentData);
  }, [tournamentData]);

  const stats = useMemo(() => {
    return getTournamentStats(tournamentData);
  }, [tournamentData]);

  // Handle match selection
  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    onMatchClick?.(match);
  };

  // Custom match component with Tailwind styling
  const MatchComponent = (props) => {
    const { match } = props;
    
    return (
      <div
        className={`
          bg-white dark:bg-neutral-800 
          border border-neutral-200 dark:border-neutral-700 
          rounded-lg shadow-sm hover:shadow-md 
          transition-all duration-200 
          cursor-pointer hover:border-primary-300 dark:hover:border-primary-600
          ${selectedMatch?.id === match.id ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800' : ''}
        `}
        onClick={() => handleMatchClick(match)}
      >
        <div className="p-3">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
            {match.name}
          </div>
          {match.participants?.map((participant, index) => (
            <div
              key={participant.id || index}
              className={`
                flex justify-between items-center py-2 px-3 rounded
                ${index === 0 ? 'mb-1' : ''}
                ${participant.isWinner 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 font-semibold' 
                  : 'bg-neutral-50 dark:bg-neutral-700/50'
                }
              `}
            >
              <span className="text-sm truncate pr-2" title={participant.name}>
                {participant.name || 'TBD'}
              </span>
              <span className="text-sm font-mono min-w-[2rem] text-right">
                {participant.resultText || '-'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading tournament bracket...</p>
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
            Error Loading Bracket
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Validation errors
  if (!validation.isValid) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Invalid Tournament Data
          </h3>
          <ul className="text-sm text-neutral-600 dark:text-neutral-400 text-left">
            {validation.errors.map((error, index) => (
              <li key={index} className="mb-1">• {error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Empty state
  if (!bracketData || bracketData.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-neutral-400 text-4xl mb-4">🏆</div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            No Tournament Data
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Tournament bracket will appear here once data is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tournament-bracket-container">
      {/* Tournament Info Header */}
      {tournamentData?.tournament && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                {tournamentData.tournament.name}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <span>📅 {tournamentData.tournament.year}</span>
                <span>⚖️ {tournamentData.tournament.weight_class}</span>
                <span>🏫 {tournamentData.tournament.division}</span>
              </div>
            </div>
            
            {/* Tournament Stats */}
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">{stats.totalRounds}</div>
                <div className="text-neutral-500">Rounds</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">{stats.completedMatches}</div>
                <div className="text-neutral-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">{stats.remainingMatches}</div>
                <div className="text-neutral-500">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Bracket Container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-100 dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-neutral-800">
        <div className="min-w-max p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-lg">
          <SingleEliminationBracket
            matches={bracketData}
            matchComponent={MatchComponent}
          />
        </div>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400 sm:hidden">
        👈 Scroll horizontally to view full bracket
      </div>
    </div>
  );
}

export default BracketView;