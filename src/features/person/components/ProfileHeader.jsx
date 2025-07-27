/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

/**
 * Profile header component displaying person's name, image, and basic info
 * @param {Object} props
 * @param {import('../types/person.types.js').PersonProfile} props.profile - Person profile data
 */
function ProfileHeader({ profile }) {
  const navigate = useNavigate();

  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;
  const isWrestler = profile.roles?.some(role => role.role_type === 'wrestler');

  return (
    <div className="profile-header">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Search
      </button>
      
      <div className="profile-header-content">
        <div className="profile-image-container">
          {profile.profile_image_url ? (
            <img 
              src={profile.profile_image_url} 
              alt={fullName}
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              <span className="profile-initials">
                {profile.first_name?.[0]}{profile.last_name?.[0]}
              </span>
            </div>
          )}
        </div>
        
        <div className="profile-header-info">
          <h1 className="profile-name">{profile.search_name || fullName}</h1>
          
          <div className="profile-badges">
            <span className="profile-badge person-badge">Person</span>
            {isWrestler && (
              <span className="profile-badge wrestler-badge">Wrestler</span>
            )}
            {profile.roles?.map((role, index) => (
              role.role_type !== 'wrestler' && (
                <span key={index} className="profile-badge role-badge">
                  {role.role_type}
                </span>
              )
            ))}
          </div>

          {(profile.city_of_origin || profile.state_of_origin) && (
            <div className="profile-location">
              📍 {[profile.city_of_origin, profile.state_of_origin].filter(Boolean).join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;