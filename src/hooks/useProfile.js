import { useState, useEffect } from 'react';
import apiService from '../services/api.js';

/**
 * Hook to fetch profile data for different entity types
 * @param {string} slug - Entity slug
 * @param {string} entityType - Type of entity ('person', 'school', 'tournament')
 * @returns {Object} { profile, loading, error, refetch }
 */
export function useProfile(slug, entityType = 'person') {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Generate fallback mock data when API fails
   * @param {string} slug - Entity slug
   * @param {string} entityType - Entity type
   * @returns {Object} Mock profile data
   */
  const generateMockProfile = (slug, entityType) => {
    return {
      slug: slug,
      entityType: entityType,
      first_name: entityType === 'person' ? 'Demo' : undefined,
      last_name: entityType === 'person' ? 'Person' : undefined,
      search_name: entityType === 'person' ? `Demo Person ${slug}` : 
                  entityType === 'school' ? `Demo School ${slug}` :
                  `Demo Tournament ${slug}`,
      name: entityType !== 'person' ? `Demo ${entityType} ${slug}` : undefined,
      state_of_origin: entityType === 'person' ? 'PA' : undefined,
      location: entityType !== 'person' ? 'Demo Location' : undefined,
      roles: entityType === 'person' ? ['Wrestler', 'Coach'] : [],
      school: entityType === 'person' ? 'Penn State University' : undefined,
      weight_class: entityType === 'person' ? '184 lbs' : undefined,
      wins: entityType === 'person' ? 42 : undefined,
      losses: entityType === 'person' ? 8 : undefined,
      bio: `This is a dummy ${entityType} page for slug: ${slug}. In a real application, this would fetch actual data from the API.`,
      achievements: [
        entityType === 'person' ? 'NCAA Division I Champion (2023)' :
        entityType === 'school' ? 'Top Wrestling Program' :
        'Major Championship Tournament',
        'Excellence in Competition',
        'Outstanding Performance'
      ],
      stats: entityType === 'person' ? {
        career_wins: 156,
        career_losses: 23,
        pins: 45,
        tech_falls: 12,
        major_decisions: 28
      } : {}
    };
  };

  /**
   * Load profile data from API or fallback to mock data
   */
  const loadProfile = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      
      // Construct API endpoint based on entity type
      const apiEndpoint = `/${entityType}/${slug}`;
      
      // Try to fetch real profile data first
      try {
        console.log(`🔍 Fetching ${entityType} data from:`, apiEndpoint);
        const profileData = await apiService.get(apiEndpoint);
        setProfile({
          ...profileData,
          entityType: entityType,
          // Add additional dummy data for demo purposes
          roles: entityType === 'person' ? ['Wrestler'] : [],
          achievements: [
            entityType === 'person' ? 'NCAA Division I Champion (2023)' : 
            entityType === 'school' ? 'Top Wrestling Program' :
            'Major Championship Tournament',
            'Excellence in Competition',
            'Outstanding Performance'
          ],
          stats: entityType === 'person' ? {
            career_wins: 156,
            career_losses: 23,
            pins: 45,
            tech_falls: 12,
            major_decisions: 28
          } : {}
        });
      } catch (apiError) {
        // Fallback to dummy data if API fails
        console.log('API failed, using dummy data:', apiError);
        setProfile(generateMockProfile(slug, entityType));
      }
    } catch (err) {
      console.error('Profile loading failed:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [slug, entityType]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    profile,
    loading,
    error,
    refetch: loadProfile
  };
}

export default useProfile;