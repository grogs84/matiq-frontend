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
    <div className="profile-tabs">
      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default ProfileTabs;