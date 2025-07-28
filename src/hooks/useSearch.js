import { useState, useCallback } from 'react';
import apiService from '../services/api.js';

/**
 * Custom hook for search functionality
 * @returns {Object} { results, loading, error, search, clearResults }
 */
export function useSearch() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query, limit = 20) => {
    if (!query.trim()) {
      setResults(null);
      setError(null);
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.search(query, limit);
      setResults(data);
      return data;
    } catch (err) {
      console.error('Search failed:', err);
      setError(err);
      setResults(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return { 
    results, 
    loading, 
    error, 
    search,
    clearResults
  };
}

export default useSearch;