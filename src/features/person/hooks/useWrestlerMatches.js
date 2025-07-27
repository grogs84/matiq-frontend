import { useState, useEffect } from 'react';
import apiService from '../../../services/api.js';

/**
 * Hook to fetch wrestler matches with pagination
 * @param {string} slug - Person slug
 * @param {number} page - Current page (default: 1)
 * @param {number} pageSize - Page size (default: 20)
 * @param {boolean} enabled - Whether to enable the query (default: true)
 * @returns {Object} { matches, total, page, pageSize, loading, error, refetch }
 */
export function useWrestlerMatches(slug, page = 1, pageSize = 20, enabled = true) {
  const [data, setData] = useState({
    matches: [],
    total: 0,
    page: 1,
    page_size: 20
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
    if (!slug || !enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get(`/api/v1/person/${slug}/wrestler/matches`, {
        page,
        page_size: pageSize
      });
      setData(response);
    } catch (err) {
      console.error('Failed to fetch wrestler matches:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchMatches();
    }
  }, [slug, page, pageSize, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    matches: data.matches,
    total: data.total,
    page: data.page,
    pageSize: data.page_size,
    loading,
    error,
    refetch: fetchMatches
  };
}

export default useWrestlerMatches;