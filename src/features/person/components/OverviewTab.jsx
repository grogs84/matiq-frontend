/* eslint-disable react/prop-types */

/**
 * Overview tab showing basic person information
 * @param {Object} props
 * @param {import('../types/person.types.js').PersonProfile} props.profile - Person profile data
 */
function OverviewTab({ profile }) {
  if (!profile) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="overview-tab">
      <div className="overview-section">
        <h2>Basic Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>First Name:</label>
            <span>{profile.first_name || 'Not specified'}</span>
          </div>
          <div className="info-item">
            <label>Last Name:</label>
            <span>{profile.last_name || 'Not specified'}</span>
          </div>
          <div className="info-item">
            <label>Search Name:</label>
            <span>{profile.search_name || 'Not specified'}</span>
          </div>
          <div className="info-item">
            <label>Date of Birth:</label>
            <span>{formatDate(profile.date_of_birth)}</span>
          </div>
          <div className="info-item">
            <label>City of Origin:</label>
            <span>{profile.city_of_origin || 'Not specified'}</span>
          </div>
          <div className="info-item">
            <label>State of Origin:</label>
            <span>{profile.state_of_origin || 'Not specified'}</span>
          </div>
        </div>
      </div>

      {profile.roles && profile.roles.length > 0 && (
        <div className="overview-section">
          <h2>Roles</h2>
          <div className="roles-list">
            {profile.roles.map((role, index) => (
              <div key={role.role_id || index} className="role-item">
                <span className="role-badge">
                  {role.role_type.charAt(0).toUpperCase() + role.role_type.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.profile_image_url && (
        <div className="overview-section">
          <h2>Profile Image</h2>
          <div className="profile-image-section">
            <img 
              src={profile.profile_image_url} 
              alt={`${profile.first_name} ${profile.last_name}`}
              className="profile-image-large"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default OverviewTab;