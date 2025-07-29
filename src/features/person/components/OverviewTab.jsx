/* eslint-disable react/prop-types */
import { toTitleCase } from '../../../utils';

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
    <div className="space-y-8">
      {/* Basic Information Card */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">First Name</label>
            <span className="block text-neutral-900 dark:text-white">{toTitleCase(profile.first_name) || 'Not specified'}</span>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Last Name</label>
            <span className="block text-neutral-900 dark:text-white">{toTitleCase(profile.last_name) || 'Not specified'}</span>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Search Name</label>
            <span className="block text-neutral-900 dark:text-white">{toTitleCase(profile.search_name) || 'Not specified'}</span>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Date of Birth</label>
            <span className="block text-neutral-900 dark:text-white">{formatDate(profile.date_of_birth)}</span>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">City of Origin</label>
            <span className="block text-neutral-900 dark:text-white">{toTitleCase(profile.city_of_origin) || 'Not specified'}</span>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">State of Origin</label>
            <span className="block text-neutral-900 dark:text-white">{toTitleCase(profile.state_of_origin) || 'Not specified'}</span>
          </div>
        </div>
      </div>

      {/* Roles Card */}
      {profile.roles && profile.roles.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            Roles
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.roles.map((role, index) => (
              <div key={role.role_id || index} className="badge-primary">
                {toTitleCase(role.role_type)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Image Card */}
      {profile.profile_image_url && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Profile Image
          </h2>
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={profile.profile_image_url} 
                alt={`${toTitleCase(profile.first_name)} ${toTitleCase(profile.last_name)}`}
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-black/5"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OverviewTab;