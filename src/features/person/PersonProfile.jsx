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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-gray-600">The person you're looking for might not exist or there was an error loading their profile.</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Profile Not Found</h2>
          <p className="text-gray-600">No profile data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader profile={profile} />
      
      <div className="max-w-8xl mx-auto px-4 py-8">
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