/* eslint-disable react/prop-types */
import { useParams, useNavigate } from 'react-router-dom';
import useProfile from '../hooks/useProfile.js';
import Layout from './common/Layout.jsx';
import Section from './common/Section.jsx';
import StateRenderer from './common/StateRenderer.jsx';
import { ProfileHeader, BasicInformation, Biography, Statistics, Achievements } from './profile/ProfileSections.jsx';

function ProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Determine entity type from URL path
  const currentPath = window.location.pathname;
  let entityType = 'person'; // default
  
  if (currentPath.includes('/school/')) {
    entityType = 'school';
  } else if (currentPath.includes('/tournament/')) {
    entityType = 'tournament';
  }
  
  // Use profile hook instead of manual state management
  const { profile, loading, error } = useProfile(slug, entityType);

  return (
    <Layout>
      <StateRenderer
        loading={loading}
        error={error}
        data={profile}
        loadingMessage="Loading profile..."
        renderError={(error) => (
          <Section centered>
            <div className="max-w-md mx-auto text-center p-8">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Profile Not Found</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">{error}</p>
                <p className="text-neutral-500 dark:text-neutral-500 text-sm">
                  The person you&rsquo;re looking for might not exist or there was an error loading their profile.
                </p>
                <button onClick={() => navigate('/')} className="back-button mt-4">
                  Back to Search
                </button>
              </div>
            </div>
          </Section>
        )}
      >
        {(profile) => (
          <div className="profile-page">
            <ProfileHeader profile={profile} onBackClick={() => navigate('/')} />

            <div className="profile-content">
              <Section className="profile-section">
                <BasicInformation profile={profile} />
              </Section>

              <Section className="profile-section">
                <Biography profile={profile} />
              </Section>

              <Section className="profile-section">
                <Statistics profile={profile} />
              </Section>

              <Section className="profile-section">
                <Achievements profile={profile} />
              </Section>
            </div>
          </div>
        )}
      </StateRenderer>
    </Layout>
  );
}

export default ProfilePage;
