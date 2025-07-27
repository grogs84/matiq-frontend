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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex bg-gray-50 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 py-4 px-6 bg-transparent border-none text-base font-medium cursor-pointer transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-white text-primary border-b-2 border-primary' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-foreground'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="p-8">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default ProfileTabs;