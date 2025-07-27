/* eslint-disable react/prop-types */
import { toTitleCase, formatLocation } from '../../../utils/textUtils.js';

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
    <div className="bg-white border-b border-gray-200 py-8 px-4">
      <div className="max-w-8xl mx-auto flex items-center gap-8">
        <div className="flex-shrink-0">
          {profile.profile_image_url ? (
            <img 
              src={profile.profile_image_url} 
              alt={fullName}
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
              <span className="text-3xl font-semibold text-white">
                {profile.first_name?.[0]}{profile.last_name?.[0]}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-foreground mb-4">{toTitleCase(profile.search_name) || fullName}</h1>
          
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">Person</span>
            {isWrestler && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">Wrestler</span>
            )}
            {profile.roles?.map((role, index) => (
              role.role_type !== 'wrestler' && (
                <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {toTitleCase(role.role_type)}
                </span>
              )
            ))}
          </div>

          {(profile.city_of_origin || profile.state_of_origin) && (
            <div className="text-gray-600 text-base">
              📍 {formatLocation(profile.city_of_origin, profile.state_of_origin)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;