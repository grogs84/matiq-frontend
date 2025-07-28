import { useState } from 'react';
import apiService from '../services/api.js';

/**
 * Hook to handle search functionality including full search and look-ahead
 * @returns {Object} { searchResults, isSearching, searchError, currentQuery, showResults, search, lookAhead, clearSearch }
 */
export function useSearch() {
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  /**
   * Perform a full search
   * @param {string} query - The search query
   */
  const search = async (query) => {
    if (!query.trim()) {
      // Clear results if empty query
      setSearchResults(null);
      setSearchError(null);
      setShowResults(false);
      setCurrentQuery('');
      return;
    }

    console.log('Searching for:', query);
    setCurrentQuery(query);
    setIsSearching(true);
    setSearchError(null);
    setShowResults(true);

    try {
      const results = await apiService.search(query);
      console.log('🔍 Main search API Response:', results); // Debug log
      console.log('🔍 Search results array:', results.results); // Debug results array
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchError(error);
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * Perform a look-ahead search for autocomplete suggestions
   * @param {string} query - The search query
   * @param {number} limit - Maximum number of results (default: 5)
   * @returns {Array} Array of search results
   */
  const lookAhead = async (query, limit = 5) => {
    // For look-ahead, we'll do a quick search with a smaller limit
    const results = await apiService.search(query, limit);
    console.log('🔍 Look-ahead API Response:', results); // Debug log
    console.log('🔍 First result:', results.results?.[0]); // Debug first result
    return results.results || [];
  };

  /**
   * Clear search results and reset state
   */
  const clearSearch = () => {
    setSearchResults(null);
    setSearchError(null);
    setShowResults(false);
    setCurrentQuery('');
    setIsSearching(false);
  };

  return {
    searchResults,
    isSearching,
    searchError,
    currentQuery,
    showResults,
    search,
    lookAhead,
    clearSearch
  };
}

export default useSearch;