import { useState, useEffect } from 'react';
import apiClient from '../api.js';
import { mockPersonData, mockStatsData, mockMatchesData } from '../data/mockData.js';

export function usePersonProfile(slug) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPerson = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/api/v1/person/${slug}`);
        setPerson(response.data);
      } catch (err) {
        console.error('Error fetching person:', err);
        
        // Fallback to mock data if available
        if (mockPersonData[slug]) {
          console.log('Using mock data for person:', slug);
          setPerson(mockPersonData[slug]);
        } else {
          setError(err.response?.data?.detail || 'Failed to load person profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [slug]);

  return { person, loading, error };
}

export function useWrestlerStats(slug) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    if (!slug || loading) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/api/v1/person/${slug}/wrestler/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching wrestler stats:', err);
      
      // Fallback to mock data if available
      if (mockStatsData[slug]) {
        console.log('Using mock data for stats:', slug);
        setStats(mockStatsData[slug]);
      } else {
        setError(err.response?.data?.detail || 'Failed to load wrestler statistics');
      }
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, fetchStats };
}

export function useWrestlerMatches(slug) {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0
  });

  const fetchMatches = async (page = 1, pageSize = 20) => {
    if (!slug || loading) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/api/v1/person/${slug}/wrestler/matches`, {
        params: { page, page_size: pageSize }
      });
      setMatches(response.data.matches);
      setPagination({
        page: response.data.page,
        pageSize: response.data.page_size,
        total: response.data.total
      });
    } catch (err) {
      console.error('Error fetching wrestler matches:', err);
      
      // Fallback to mock data if available
      if (mockMatchesData[slug]) {
        console.log('Using mock data for matches:', slug);
        const mockData = mockMatchesData[slug];
        setMatches(mockData.matches);
        setPagination({
          page: mockData.page,
          pageSize: mockData.page_size,
          total: mockData.total
        });
      } else {
        setError(err.response?.data?.detail || 'Failed to load wrestler matches');
      }
    } finally {
      setLoading(false);
    }
  };

  return { matches, loading, error, pagination, fetchMatches };
}