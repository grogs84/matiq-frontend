/* eslint-disable react/prop-types */
import { toTitleCase, formatLocation } from '../../../utils/textUtils.js';
import Badge from '../../../components/ui/Badge.jsx';

/**
 * Profile header component displaying person's name, image, and basic info
 * @param {Object} props
 * @param {import('../types/person.types.js').PersonProfile} props.profile - Person profile data
 */
function ProfileHeader({ profile }) {
  if (!profile) return null;

  const fullName = `${toTitleCase(profile.first_name)} ${toTitleCase(profile.last_name)}`;
  const isWrestler = profile.roles?.some(role => role.role_type === 'wrestler');

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-ncaa-navy via-ncaa-blue to-primary-700 dark:from-ncaa-navy dark:via-primary-900 dark:to-secondary-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {profile.profile_image_url ? (
              <div className="relative">
                <img 
                  src={profile.profile_image_url} 
                  alt={fullName}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20 shadow-xl"
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-white/10"></div>
              </div>
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/20 shadow-xl flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </span>
              </div>
            )}
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display">
              {toTitleCase(profile.search_name) || fullName}
            </h1>
            
            {/* Badges */}
            <Badge.Group className="flex flex-wrap justify-center md:justify-start mb-6">
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white border border-white/30 backdrop-blur-sm"
              >
                Person
              </Badge>
              {isWrestler && (
                <Badge 
                  variant="warning" 
                  className="bg-ncaa-gold/90 text-ncaa-navy border border-ncaa-gold/50 backdrop-blur-sm"
                >
                  Wrestler
                </Badge>
              )}
              {profile.roles?.map((role, index) => (
                role.role_type !== 'wrestler' && (
                  <Badge 
                    key={index} 
                    variant="error" 
                    className="bg-ncaa-orange/80 text-white border border-ncaa-orange/50 backdrop-blur-sm"
                  >
                    {toTitleCase(role.role_type)}
                  </Badge>
                )
              ))}
            </Badge.Group>

            {/* Location */}
            {(profile.city_of_origin || profile.state_of_origin) && (
              <div className="flex items-center justify-center md:justify-start text-white/90 text-lg">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {formatLocation(profile.city_of_origin, profile.state_of_origin)}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent dark:from-black/10"></div>
    </div>
  );
}

export default ProfileHeader;