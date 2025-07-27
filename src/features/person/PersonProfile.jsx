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
      <div className="person-profile loading">
        <div className="loading-container">
          <LoadingSpinner />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="person-profile error">
        <div className="error-container">
          <h2>Profile Not Found</h2>
          <p>{error}</p>
          <p>The person you&apos;re looking for might not exist or there was an error loading their profile.</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="person-profile error">
        <div className="error-container">
          <h2>Profile Not Found</h2>
          <p>No profile data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="person-profile">
      <ProfileHeader profile={profile} />
      
      <div className="person-profile-content">
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