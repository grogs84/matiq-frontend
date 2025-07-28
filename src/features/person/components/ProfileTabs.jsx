/* eslint-disable react/prop-types */
import { useState } from 'react';

/**
 * Tabbed interface for person profile sections
 * @param {Object} props
 * @param {import('../types/person.types.js').PersonProfile} props.profile - Person profile data
 * @param {React.ReactNode} props.overviewTab - Overview tab content
 * @param {React.ReactNode} props.statisticsTab - Statistics tab content  
 * @param {React.ReactNode} props.matchesTab - Matches tab content
 * @param {string} props.initialTab - Initial active tab (default: 'overview')
 */
function ProfileTabs({ 
  profile, 
  overviewTab, 
  statisticsTab, 
  matchesTab, 
  initialTab = 'overview' 
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const isWrestler = profile?.roles?.some(role => role.role_type === 'wrestler');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: overviewTab,
      enabled: true
    },
    {
      id: 'statistics',
      label: 'Statistics',
      content: statisticsTab,
      enabled: isWrestler
    },
    {
      id: 'matches',
      label: 'Matches',
      content: matchesTab,
      enabled: isWrestler
    }
  ].filter(tab => tab.enabled);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-700 mb-8">
        <nav className="flex space-x-8" aria-label="Profile tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`relative py-4 px-1 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-b-2 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="animate-fade-in">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default ProfileTabs;