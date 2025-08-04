/* eslint-disable react/prop-types */
import { useState } from 'react';

/**
 * BracketToggle component for switching between bracket and results views
 * @component
 * @param {Object} props - Component props
 * @param {string} props.activeView - Current active view ('bracket' or 'results')
 * @param {Function} props.onViewChange - Callback when view changes
 * @param {boolean} props.disabled - Whether the toggle is disabled
 */
function BracketToggle({ activeView = 'bracket', onViewChange, disabled = false }) {
  const [currentView, setCurrentView] = useState(activeView);

  const handleViewChange = (view) => {
    if (disabled || view === currentView) return;
    
    setCurrentView(view);
    onViewChange?.(view);
  };

  const views = [
    {
      id: 'bracket',
      label: 'Bracket View',
      icon: '🏆',
      description: 'Tournament bracket visualization'
    },
    {
      id: 'results',
      label: 'Results View',
      icon: '📊',
      description: 'Match results and statistics'
    }
  ];

  return (
    <div className="bracket-toggle">
      {/* Mobile Toggle Selector */}
      <div className="sm:hidden mb-4">
        <select
          className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-700 dark:text-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          value={currentView}
          onChange={(e) => handleViewChange(e.target.value)}
          disabled={disabled}
        >
          {views.map((view) => (
            <option key={view.id} value={view.id}>
              {view.icon} {view.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tab Interface */}
      <div className="hidden sm:block">
        <div className="border-b border-neutral-200 dark:border-neutral-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tournament views">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => handleViewChange(view.id)}
                disabled={disabled}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                  ${currentView === view.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:border-neutral-600'
                  }
                  ${disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer'
                  }
                `}
                aria-current={currentView === view.id ? 'page' : undefined}
                title={view.description}
              >
                <span className="mr-2 text-lg" role="img" aria-label={view.label}>
                  {view.icon}
                </span>
                {view.label}
                
                {/* Active indicator */}
                {currentView === view.id && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    Active
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* View Description */}
      <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        {views.find(view => view.id === currentView)?.description}
      </div>
    </div>
  );
}

export default BracketToggle;