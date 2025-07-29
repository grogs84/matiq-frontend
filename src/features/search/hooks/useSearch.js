import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/api.js';

/**
 * Enhanced search hook that manages all search-related state and functionality
 * 
 * This hook encapsulates:
 * - Search input management with debouncing
 * - Full search and look-ahead suggestions
 * - Loading states and error handling
 * - Dropdown visibility management
 * - Navigation for search results
 * - API integration through apiService
 * 
 * @returns {Object} Complete search state and action functions
 */
export function useSearch() {
  const navigate = useNavigate();
  
  // Main search state
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // Input and suggestions state (extracted from SearchBar)
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  
  // Refs for debouncing and dropdown management
  const debounceTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

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
   * Handle input changes with debounced look-ahead search
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Clear results if input is empty
    if (!value.trim()) {
      search('');
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // Debounce the look-ahead search
    debounceTimeoutRef.current = setTimeout(async () => {
      if (value.trim().length >= 2) {
        setIsLoadingSuggestions(true);
        try {
          const results = await lookAhead(value.trim());
          setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
          setShowDropdown(true);
        } catch (error) {
          console.error('Look-ahead search failed:', error);
          setSuggestions([]);
        } finally {
          setIsLoadingSuggestions(false);
        }
      }
    }, 300); // 300ms debounce
  };

  /**
   * Handle form submission (search button or enter key)
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (query) {
      search(query);
      setShowDropdown(false);
    }
  };

  /**
   * Handle suggestion click with navigation for person results
   * @param {Object} suggestion - The clicked suggestion object
   */
  const handleSuggestionClick = (suggestion) => {
    console.log('🖱️ Clicked suggestion:', suggestion); // Debug log
    
    // Navigate to profile page for persons, otherwise do search
    if (suggestion.result_type === 'person') {
      const slug = suggestion.slug;
      console.log('🆔 Using slug for navigation:', slug);
      navigate(`/person/${slug}`);
    } else {
      const query = suggestion.search_name || suggestion.name;
      search(query);
    }
    
    setInputValue(suggestion.search_name || suggestion.name);
    setShowDropdown(false);
  };

  /**
   * Handle search result click with navigation for person results
   * @param {Object} result - The clicked result object
   */
  const handleResultClick = (result) => {
    console.log('🖱️ Clicked search result:', result); // Debug log
    
    // Navigate to profile page for persons
    if (result.result_type === 'person') {
      const slug = result.slug;
      console.log('🆔 Using slug for navigation:', slug); // Debug log
      navigate(`/person/${slug}`);
    }
    // Could add other result type handling here in the future
  };

  /**
   * Clear input and suggestions
   */
  const handleClear = () => {
    setInputValue('');
    setSuggestions([]);
    setShowDropdown(false);
    search('');
  };

  /**
   * Clear search results and reset all state
   */
  const clearSearch = () => {
    setSearchResults(null);
    setSearchError(null);
    setShowResults(false);
    setCurrentQuery('');
    setIsSearching(false);
    setInputValue('');
    setSuggestions([]);
    setShowDropdown(false);
    setIsLoadingSuggestions(false);
  };

  // Effect for cleanup and outside click handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Main search state
    searchResults,
    isSearching,
    searchError,
    currentQuery,
    showResults,
    
    // Input and suggestions state
    inputValue,
    suggestions,
    showDropdown,
    isLoadingSuggestions,
    
    // Refs for component use
    dropdownRef,
    
    // Action functions
    search,
    lookAhead,
    handleInputChange,
    handleSubmit,
    handleSuggestionClick,
    handleResultClick,
    handleClear,
    clearSearch
  };
}

export default useSearch;