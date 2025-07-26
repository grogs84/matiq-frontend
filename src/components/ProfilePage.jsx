/* eslint-disable react/prop-types */
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiService from '../services/api.js';

function ProfilePage() {
//   const { id } = useParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        
        // Determine entity type from URL path
        const currentPath = window.location.pathname;
        let entityType = 'person'; // default
        let apiEndpoint = `/person/${slug}`;
        
        if (currentPath.includes('/school/')) {
          entityType = 'school';
          apiEndpoint = `/school/${slug}`;
        } else if (currentPath.includes('/tournament/')) {
          entityType = 'tournament';
          apiEndpoint = `/tournament/${slug}`;
        }
        
        // Try to fetch real profile data first
        try {
          console.log(`🔍 Fetching ${entityType} data from:`, apiEndpoint);
          const profileData = await apiService.get(apiEndpoint);
          setProfile({
            ...profileData,
            entityType: entityType,
            // Add additional dummy data for demo purposes
            roles: entityType === 'person' ? ['Wrestler'] : [],
            achievements: [
              entityType === 'person' ? 'NCAA Division I Champion (2023)' : 
              entityType === 'school' ? 'Top Wrestling Program' :
              'Major Championship Tournament',
              'Excellence in Competition',
              'Outstanding Performance'
            ],
            stats: entityType === 'person' ? {
              career_wins: 156,
              career_losses: 23,
              pins: 45,
              tech_falls: 12,
              major_decisions: 28
            } : {}
          });
        } catch (apiError) {
          // Fallback to dummy data if API fails
          console.log('API failed, using dummy data:', apiError);
          setProfile({
            slug: slug,
            entityType: entityType,
            first_name: entityType === 'person' ? 'Demo' : undefined,
            last_name: entityType === 'person' ? 'Person' : undefined,
            search_name: entityType === 'person' ? `Demo Person ${slug}` : 
                        entityType === 'school' ? `Demo School ${slug}` :
                        `Demo Tournament ${slug}`,
            name: entityType !== 'person' ? `Demo ${entityType} ${slug}` : undefined,
            state_of_origin: entityType === 'person' ? 'PA' : undefined,
            location: entityType !== 'person' ? 'Demo Location' : undefined,
            roles: entityType === 'person' ? ['Wrestler', 'Coach'] : [],
            school: entityType === 'person' ? 'Penn State University' : undefined,
            weight_class: entityType === 'person' ? '184 lbs' : undefined,
            wins: entityType === 'person' ? 42 : undefined,
            losses: entityType === 'person' ? 8 : undefined,
            bio: `This is a dummy ${entityType} page for slug: ${slug}. In a real application, this would fetch actual data from the API.`,
            achievements: [
              entityType === 'person' ? 'NCAA Division I Champion (2023)' :
              entityType === 'school' ? 'Top Wrestling Program' :
              'Major Championship Tournament',
              'Excellence in Competition',
              'Outstanding Performance'
            ],
            stats: entityType === 'person' ? {
              career_wins: 156,
              career_losses: 23,
              pins: 45,
              tech_falls: 12,
              major_decisions: 28
            } : {}
          });
        }
      } catch (err) {
        console.error('Profile loading failed:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [slug]); // Changed from [id] to [slug]

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
