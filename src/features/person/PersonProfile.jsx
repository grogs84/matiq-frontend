/* eslint-disable react/prop-types */
import { useParams, useSearchParams } from 'react-router-dom';
import usePersonProfile from './hooks/usePersonProfile.js';
import ProfileHeader from './components/ProfileHeader.jsx';
import ProfileTabs from './components/ProfileTabs.jsx';
import OverviewTab from './components/OverviewTab.jsx';
import StatisticsTab from './components/StatisticsTab.jsx';
import MatchesTab from './components/MatchesTab.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

/**
 * Main person profile page component
 */
function PersonProfile() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  
  const { profile, loading, error } = usePersonProfile(slug);

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Profile Not Found</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">
              The person you're looking for might not exist or there was an error loading their profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Profile Not Found</h2>
            <p className="text-neutral-600 dark:text-neutral-400">No profile data available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient">
      <ProfileHeader profile={profile} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileTabs
          profile={profile}
          initialTab={initialTab}
          overviewTab={<OverviewTab profile={profile} />}
          statisticsTab={<StatisticsTab slug={slug} />}
          matchesTab={<MatchesTab slug={slug} />}
        />
      </div>
    </div>
  );
}

export default PersonProfile;