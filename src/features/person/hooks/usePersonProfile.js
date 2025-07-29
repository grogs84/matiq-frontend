import { useState, useEffect } from 'react';
import { apiService } from '../../../services';

/**
 * Hook to fetch person profile data
 * @param {string} slug - Person slug
 * @returns {Object} { profile, loading, error, refetch }
 */
export function usePersonProfile(slug) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.get(`/api/v1/person/${slug}`);
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch person profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile
  };
}

export default usePersonProfile;