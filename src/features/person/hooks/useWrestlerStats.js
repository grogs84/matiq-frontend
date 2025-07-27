import { useState, useEffect } from 'react';
import apiService from '../../../services/api.js';

/**
 * Hook to fetch wrestler statistics
 * @param {string} slug - Person slug
 * @param {boolean} enabled - Whether to enable the query (default: true)
 * @returns {Object} { stats, loading, error, refetch }
 */
export function useWrestlerStats(slug, enabled = true) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    if (!slug || !enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.get(`/api/v1/person/${slug}/wrestler/stats`);
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch wrestler stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchStats();
    }
  }, [slug, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}

export default useWrestlerStats;