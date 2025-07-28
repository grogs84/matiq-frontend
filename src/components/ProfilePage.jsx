/* eslint-disable react/prop-types */
import { useParams, useNavigate } from 'react-router-dom';
import useProfile from '../hooks/useProfile.js';

function ProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Determine entity type from URL path
  const currentPath = window.location.pathname;
  let entityType = 'person'; // default
  
  if (currentPath.includes('/school/')) {
    entityType = 'school';
  } else if (currentPath.includes('/tournament/')) {
    entityType = 'tournament';
  }
  
  // Use profile hook instead of manual state management
  const { profile, loading, error } = useProfile(slug, entityType);

  if (loading) {
    return (
      <div className="profile-page loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page error">
        <div className="error-container">
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Search
        </button>
        <h1>{profile.search_name || profile.name || `${profile.first_name} ${profile.last_name}` || `Demo ${profile.entityType}`}</h1>
        <div className="profile-badges">
          <span className="profile-badge">
            {profile.entityType === 'person' ? 'Person' : 
             profile.entityType === 'school' ? 'School' : 
             profile.entityType === 'tournament' ? 'Tournament' : 'Profile'}
          </span>
          {profile.roles?.map((role, index) => (
            <span key={index} className="profile-badge">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Basic Information</h2>
          <div className="profile-grid">
            {profile.entityType === 'person' && (
              <>
                <div className="profile-item">
                  <label>School:</label>
                  <span>{profile.school || 'Unknown'}</span>
                </div>
                <div className="profile-item">
                  <label>Weight Class:</label>
                  <span>{profile.weight_class || 'Unknown'}</span>
                </div>
                <div className="profile-item">
                  <label>State:</label>
                  <span>{profile.state_of_origin || 'Unknown'}</span>
                </div>
              </>
            )}
            {profile.entityType === 'school' && (
              <div className="profile-item">
                <label>Location:</label>
                <span>{profile.location || 'Unknown'}</span>
              </div>
            )}
            {profile.entityType === 'tournament' && (
              <div className="profile-item">
                <label>Location:</label>
                <span>{profile.location || 'Unknown'}</span>
              </div>
            )}
            <div className="profile-item">
              <label>Profile URL:</label>
              <span>/{profile.entityType === 'person' ? 'profile' : profile.entityType}/{profile.slug}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Biography</h2>
          <p className="profile-bio">{profile.bio}</p>
        </div>

        <div className="profile-section">
          <h2>{profile.entityType === 'person' ? 'Career Statistics' : 'Statistics'}</h2>
          {profile.entityType === 'person' && (
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{profile.stats?.career_wins || 0}</span>
                <span className="stat-label">Career Wins</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profile.stats?.career_losses || 0}</span>
                <span className="stat-label">Career Losses</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profile.stats?.pins || 0}</span>
                <span className="stat-label">Pins</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profile.stats?.tech_falls || 0}</span>
                <span className="stat-label">Tech Falls</span>
              </div>
            </div>
          )}
          {profile.entityType !== 'person' && (
            <p>Statistics and data for this {profile.entityType} will be available soon.</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Achievements</h2>
          <ul className="achievements-list">
            {profile.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
