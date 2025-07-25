/* eslint-disable react/prop-types */
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiService from '../services/api.js';

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For now, create dummy profile data based on ID
    // Later this would be an API call to get profile details
    const loadProfile = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create dummy profile data
        setProfile({
          id: id,
          name: `Demo Person ${id}`,
          type: 'person',
          roles: ['Wrestler', 'Coach'],
          school: 'Penn State University',
          weight_class: '184 lbs',
          wins: 42,
          losses: 8,
          bio: `This is a dummy profile page for person ID: ${id}. In a real application, this would fetch actual data from the API and display detailed information about the wrestler, coach, or other person.`,
          achievements: [
            'NCAA Division I Champion (2023)',
            'Big Ten Conference Champion (2022, 2023)',
            'All-American (2021, 2022, 2023)'
          ],
          stats: {
            career_wins: 156,
            career_losses: 23,
            pins: 45,
            tech_falls: 12,
            major_decisions: 28
          }
        });
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

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
        <h1>{profile.name}</h1>
        <div className="profile-badges">
          {profile.roles.map((role, index) => (
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
            <div className="profile-item">
              <label>School:</label>
              <span>{profile.school}</span>
            </div>
            <div className="profile-item">
              <label>Weight Class:</label>
              <span>{profile.weight_class}</span>
            </div>
            <div className="profile-item">
              <label>Current Record:</label>
              <span>{profile.wins}-{profile.losses}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Biography</h2>
          <p className="profile-bio">{profile.bio}</p>
        </div>

        <div className="profile-section">
          <h2>Career Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{profile.stats.career_wins}</span>
              <span className="stat-label">Career Wins</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats.career_losses}</span>
              <span className="stat-label">Career Losses</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats.pins}</span>
              <span className="stat-label">Pins</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats.tech_falls}</span>
              <span className="stat-label">Tech Falls</span>
            </div>
          </div>
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
