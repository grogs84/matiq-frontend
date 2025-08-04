/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { SingleEliminationBracket } from '@g-loot/react-tournament-brackets';
import { transformTournamentData, validateTournamentData, getTournamentStats, isDoubleEliminationTournament } from '../utils/dataTransformation.js';

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
  const [activeTab, setActiveTab] = useState('winners'); // 'winners' or 'consolation'

  // Detect if this is a double elimination tournament
  const isDoubleElimination = useMemo(() => {
    return isDoubleEliminationTournament(tournamentData);
  }, [tournamentData]);

  // Transform and validate data
  const bracketData = useMemo(() => {
    if (!tournamentData) {
      return isDoubleElimination ? { winners: [], consolation: [] } : [];
    }
    
    const transformed = transformTournamentData(tournamentData);
    
    // Debug logging to see the structure
    console.log('🏆 Tournament Data Debug:', {
      isDoubleElimination,
      originalMatches: tournamentData.matches?.length,
      transformed,
      transformedType: typeof transformed,
      hasWinners: transformed?.upper?.length,
      hasConsolation: transformed?.lower?.length
    });
    
    // For double elimination, return separate brackets
    if (isDoubleElimination) {
      return {
        winners: transformed.upper || [],
        consolation: transformed.lower || []
      };
    }
    
    return transformed || [];
  }, [tournamentData, isDoubleElimination]);

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
  if (!bracketData || (isDoubleElimination ? (!bracketData.winners || bracketData.winners.length === 0) && (!bracketData.consolation || bracketData.consolation.length === 0) : bracketData.length === 0)) {
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

  // Get current bracket data based on active tab
  const currentBracketData = isDoubleElimination 
    ? (activeTab === 'winners' ? bracketData.winners : bracketData.consolation)
    : bracketData;

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

      {/* Tab Navigation for Double Elimination */}
      {isDoubleElimination && (
        <div className="mb-6">
          <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('winners')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'winners'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              🏆 Winners Bracket
              <span className="ml-2 text-xs bg-neutral-200 dark:bg-neutral-600 px-2 py-1 rounded-full">
                {bracketData.winners?.length || 0} matches
              </span>
            </button>
            <button
              onClick={() => setActiveTab('consolation')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'consolation'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              🥉 Consolation Bracket
              <span className="ml-2 text-xs bg-neutral-200 dark:bg-neutral-600 px-2 py-1 rounded-full">
                {bracketData.consolation?.length || 0} matches
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Responsive Bracket Container */}
      <div className="w-full overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-100 dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-neutral-800">
        <div className="min-w-max p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-lg">
          
          {/* Render brackets differently based on type */}
          {isDoubleElimination && activeTab === 'consolation' ? (
            // Custom consolation bracket layout
            <div className="consolation-bracket-layout">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
                Consolation Bracket - Path to 3rd Place
              </h3>
              <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)', minWidth: '1000px' }}>
                {/* Round 1 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 text-center">Round 1</h4>
                  {currentBracketData
                    .filter(match => match.tournamentRoundText === "1")
                    .map(match => (
                      <MatchComponent key={match.id} match={match} />
                    ))}
                </div>
                
                {/* Round 2 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 text-center">Round 2</h4>
                  {currentBracketData
                    .filter(match => match.tournamentRoundText === "2")
                    .map(match => (
                      <MatchComponent key={match.id} match={match} />
                    ))}
                </div>
                
                {/* Round 3 */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 text-center">Round 3</h4>
                  {currentBracketData
                    .filter(match => match.tournamentRoundText === "3")
                    .map(match => (
                      <MatchComponent key={match.id} match={match} />
                    ))}
                </div>
                
                {/* Finals */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 text-center">3rd Place</h4>
                  {currentBracketData
                    .filter(match => match.tournamentRoundText === "4")
                    .map(match => (
                      <MatchComponent key={match.id} match={match} />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            // Standard single elimination bracket
            <SingleEliminationBracket
              matches={currentBracketData}
              matchComponent={MatchComponent}
            />
          )}
        </div>
      </div>

      {/* Enhanced Mobile Scroll Hint */}
      <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400 sm:hidden">
        👈 Scroll horizontally to view full bracket
        {isDoubleElimination && activeTab === 'consolation' && (
          <div className="mt-1 text-xs">Consolation bracket shows all rounds - scroll to see 3rd place match</div>
        )}
      </div>
    </div>
  );
}

export default BracketView;