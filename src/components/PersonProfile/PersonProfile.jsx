import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PersonProfile.css';

function PersonProfile() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // TODO: Fetch person data
    // For now, just set loading to false to show the UI structure
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [slug]);

  if (loading) {
    return (
      <div className="person-profile">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="person-profile">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="person-profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image">
            <div className="avatar-placeholder">
              {slug ? slug.charAt(0).toUpperCase() : 'P'}
            </div>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{slug || 'Person Profile'}</h1>
            <div className="role-badges">
              <span className="role-badge wrestler">Wrestler</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </button>
          <button 
            className={`tab-button ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => setActiveTab('matches')}
          >
            Matches
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <h3>Basic Information</h3>
              <p>Coming soon...</p>
            </div>
          )}
          {activeTab === 'statistics' && (
            <div className="statistics-tab">
              <h3>Wrestling Statistics</h3>
              <p>Coming soon...</p>
            </div>
          )}
          {activeTab === 'matches' && (
            <div className="matches-tab">
              <h3>Match History</h3>
              <p>Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonProfile;