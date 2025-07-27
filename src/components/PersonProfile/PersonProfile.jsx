import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { usePersonProfile, useWrestlerStats, useWrestlerMatches } from '../../hooks/usePersonData.js';
import OverviewTab from './components/OverviewTab.jsx';
import StatisticsTab from './components/StatisticsTab.jsx';
import MatchesTab from './components/MatchesTab.jsx';
import './PersonProfile.css';

function PersonProfile() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  // API hooks
  const { person, loading: personLoading, error: personError } = usePersonProfile(slug);
  const { stats, loading: statsLoading, error: statsError, fetchStats } = useWrestlerStats(slug);
  const { matches, loading: matchesLoading, error: matchesError, pagination, fetchMatches } = useWrestlerMatches(slug);

  // Handle tab from URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'statistics', 'matches'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
    
    // Lazy load data when tab is accessed
    if (tab === 'statistics' && !stats && !statsLoading) {
      fetchStats();
    } else if (tab === 'matches' && !matches && !matchesLoading) {
      fetchMatches(1, 20);
    }
  };

  if (personLoading) {
    return (
      <div className="person-profile">
        <div className="loading-spinner">Loading person profile...</div>
      </div>
    );
  }

  if (personError) {
    return (
      <div className="person-profile">
        <div className="error-message">
          <h2>Profile Not Found</h2>
          <p>{personError}</p>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="person-profile">
        <div className="error-message">
          <h2>Person Not Found</h2>
          <p>The person profile you&apos;re looking for could not be found.</p>
        </div>
      </div>
    );
  }

  // Check if person has wrestler role
  const isWrestler = person.roles?.some(role => role.role_type === 'wrestler');

  return (
    <div className="person-profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image">
            <div className="avatar-placeholder">
              {person.first_name ? person.first_name.charAt(0).toUpperCase() : slug.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {person.first_name && person.last_name 
                ? `${person.first_name} ${person.last_name}`
                : person.search_name || slug.replace('-', ' ')
              }
            </h1>
            <div className="role-badges">
              {person.roles?.map((role, index) => (
                <span key={index} className={`role-badge ${role.role_type}`}>
                  {role.role_type}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          {isWrestler && (
            <>
              <button 
                className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
                onClick={() => handleTabChange('statistics')}
              >
                Statistics
              </button>
              <button 
                className={`tab-button ${activeTab === 'matches' ? 'active' : ''}`}
                onClick={() => handleTabChange('matches')}
              >
                Matches
              </button>
            </>
          )}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <OverviewTab person={person} />
          )}
          {activeTab === 'statistics' && isWrestler && (
            <StatisticsTab 
              stats={stats}
              loading={statsLoading}
              error={statsError}
              onFetch={fetchStats}
            />
          )}
          {activeTab === 'matches' && isWrestler && (
            <MatchesTab 
              matches={matches}
              loading={matchesLoading}
              error={matchesError}
              pagination={pagination}
              onFetch={fetchMatches}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonProfile;