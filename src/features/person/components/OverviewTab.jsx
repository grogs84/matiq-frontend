/* eslint-disable react/prop-types */
import { toTitleCase } from '../../../utils/textUtils.js';

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
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <label className="font-medium text-gray-700">First Name:</label>
            <span className="text-foreground">{toTitleCase(profile.first_name) || 'Not specified'}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <label className="font-medium text-gray-700">Last Name:</label>
            <span className="text-foreground">{toTitleCase(profile.last_name) || 'Not specified'}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <label className="font-medium text-gray-700">Search Name:</label>
            <span className="text-foreground">{toTitleCase(profile.search_name) || 'Not specified'}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <label className="font-medium text-gray-700">Date of Birth:</label>
            <span className="text-foreground">{formatDate(profile.date_of_birth)}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <label className="font-medium text-gray-700">City of Origin:</label>
            <span className="text-foreground">{toTitleCase(profile.city_of_origin) || 'Not specified'}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-md">
            <label className="font-medium text-gray-700">State of Origin:</label>
            <span className="text-foreground">{toTitleCase(profile.state_of_origin) || 'Not specified'}</span>
          </div>
        </div>
      </div>

      {profile.roles && profile.roles.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Roles</h2>
          <div className="flex flex-wrap gap-2">
            {profile.roles.map((role, index) => (
              <div key={role.role_id || index}>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md font-medium">
                  {toTitleCase(role.role_type)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.profile_image_url && (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Profile Image</h2>
          <div className="text-center">
            <img 
              src={profile.profile_image_url} 
              alt={`${toTitleCase(profile.first_name)} ${toTitleCase(profile.last_name)}`}
              className="max-w-sm max-h-96 rounded-xl shadow-sm mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default OverviewTab;