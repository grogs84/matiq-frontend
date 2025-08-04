/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/common';
import BracketView from './components/BracketView.jsx';
import ResultsView from './components/ResultsView.jsx';
import BracketToggle from './components/BracketToggle.jsx';
import { mockTournamentData, mockTournamentInProgress, mockEmptyTournament, mock32PersonTournament, mockDoubleEliminationTournament } from './services/mockTournamentData.js';

/**
 * Tournament page component for displaying bracket and results
 * @component
 */
function TournamentPage() {
  const { id } = useParams();
  const [activeView, setActiveView] = useState('bracket');
  const [tournamentData, setTournamentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState(id || '1');

  // Check if this is the demo page
  const isDemoPage = window.location.pathname === '/bracket-demo';

  // Demo options for the demo page
  const demoOptions = [
    { id: '1', name: '8-Person Single Elimination', description: 'Classic NCAA-style bracket' },
    { id: '4', name: '32-Person Single Elimination', description: 'Full championship bracket' },
    { id: '5', name: 'Double Elimination', description: 'Winners and losers brackets' },
    { id: '2', name: 'Tournament In Progress', description: 'Partially completed matches' },
    { id: '3', name: 'Upcoming Tournament', description: 'Empty bracket template' }
  ];

  // Simulate API call to fetch tournament data
  useEffect(() => {
    const fetchTournamentData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use selectedDemo for demo page, otherwise use id from URL
        const currentId = isDemoPage ? selectedDemo : id;
        
        // Mock data selection based on ID
        let data;
        switch (currentId) {
          case '1':
            data = mockTournamentData;
            break;
          case '2':
            data = mockTournamentInProgress;
            break;
          case '3':
            data = mockEmptyTournament;
            break;
          case '4':
            data = mock32PersonTournament;
            break;
          case '5':
            data = mockDoubleEliminationTournament;
            break;
          default:
            data = mockTournamentData;
        }
        
        setTournamentData(data);
      } catch (err) {
        setError('Failed to load tournament data. Please try again.');
        console.error('Error fetching tournament data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournamentData();
  }, [id, selectedDemo, isDemoPage]);

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleMatchClick = (match) => {
    console.log('Match clicked:', match);
    // TODO: Implement match detail modal or navigation
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                Tournament Bracket
              </h1>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                View tournament brackets and match results
              </p>
            </div>
            
            {/* Quick Navigation */}
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  '🔄 Refresh'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Demo Selector - only show on demo page */}
        {isDemoPage && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-3">
              🏆 Bracket Demos
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
              Explore different tournament bracket types and sizes to see how the visualization adapts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {demoOptions.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setSelectedDemo(demo.id)}
                  disabled={isLoading}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    selectedDemo === demo.id
                      ? 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600 text-blue-900 dark:text-blue-100'
                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="font-medium text-sm">{demo.name}</div>
                  <div className="text-xs opacity-75 mt-1">{demo.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View Toggle */}
        <div className="mb-6">
          <BracketToggle
            activeView={activeView}
            onViewChange={handleViewChange}
            disabled={isLoading}
          />
        </div>

        {/* Tournament Content */}
        <div className="tournament-content">
          {activeView === 'bracket' ? (
            <BracketView
              tournamentData={tournamentData}
              onMatchClick={handleMatchClick}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <ResultsView
              tournamentData={tournamentData}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>

        {/* Development Info - only show in dev mode */}
        {import.meta.env.DEV && (
          <div className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              🚧 Development Mode
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
              This is a proof of concept for tournament bracket visualization.
            </p>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              <p>• Tournament ID: {isDemoPage ? selectedDemo : id}</p>
              <p>• Active View: {activeView}</p>
              <p>• Data Source: Mock Data</p>
              <p>• Library: @g-loot/react-tournament-brackets</p>
              {isDemoPage && <p>• Demo Mode: {demoOptions.find(d => d.id === selectedDemo)?.name}</p>}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TournamentPage;