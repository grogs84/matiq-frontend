/* eslint-disable react/prop-types */
import Card from '../ui/Card.jsx';

/**
 * ProfileHeader component - displays profile header information
 * @component
 * @param {Object} profile - Profile data
 * @param {Function} onBackClick - Back button click handler
 * @returns {JSX.Element} The ProfileHeader component
 */
function ProfileHeader({ profile, onBackClick }) {
  return (
    <div className="profile-header">
      <button onClick={onBackClick} className="back-button">
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
  );
}

/**
 * BasicInformation component - displays basic profile information
 * @component
 * @param {Object} profile - Profile data
 * @returns {JSX.Element} The BasicInformation component
 */
function BasicInformation({ profile }) {
  return (
    <Card>
      <Card.Header>
        <h2>Basic Information</h2>
      </Card.Header>
      <Card.Content>
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
      </Card.Content>
    </Card>
  );
}

/**
 * Biography component - displays profile biography
 * @component
 * @param {Object} profile - Profile data
 * @returns {JSX.Element} The Biography component
 */
function Biography({ profile }) {
  return (
    <Card>
      <Card.Header>
        <h2>Biography</h2>
      </Card.Header>
      <Card.Content>
        <p className="profile-bio">{profile.bio}</p>
      </Card.Content>
    </Card>
  );
}

/**
 * Statistics component - displays profile statistics
 * @component
 * @param {Object} profile - Profile data
 * @returns {JSX.Element} The Statistics component
 */
function Statistics({ profile }) {
  return (
    <Card>
      <Card.Header>
        <h2>{profile.entityType === 'person' ? 'Career Statistics' : 'Statistics'}</h2>
      </Card.Header>
      <Card.Content>
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
      </Card.Content>
    </Card>
  );
}

/**
 * Achievements component - displays profile achievements
 * @component
 * @param {Object} profile - Profile data
 * @returns {JSX.Element} The Achievements component
 */
function Achievements({ profile }) {
  return (
    <Card>
      <Card.Header>
        <h2>Achievements</h2>
      </Card.Header>
      <Card.Content>
        <ul className="achievements-list">
          {profile.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
}

export { ProfileHeader, BasicInformation, Biography, Statistics, Achievements };