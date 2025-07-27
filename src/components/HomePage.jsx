/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.js';
import SearchResults from './SearchResults.jsx';

// Utility function to convert text to title case
const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Health Check Component
function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState('unknown');
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.healthCheck();
      setHealthStatus(response.status === 'healthy' ? 'healthy' : 'unhealthy');
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus('unhealthy');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getStatusClass = () => {
    switch (healthStatus) {
      case 'healthy': return 'healthy';
      case 'unhealthy': return 'unhealthy';
      default: return 'unknown';
    }
  };

  return (
    <div className="health-check">
      <button 
        className="bg-primary text-white border-none py-3 px-4 rounded-full text-sm font-medium cursor-pointer shadow-md transition-all duration-200 flex items-center gap-2 hover:bg-primary-800 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50" 
        onClick={checkHealth}
        disabled={isLoading}
      >
        <span className={`w-2 h-2 rounded-full ${
          healthStatus === 'healthy' ? 'bg-green-400' : 
          healthStatus === 'unhealthy' ? 'bg-red-400' : 
          'bg-yellow-400 animate-pulse'
        }`}></span>
        {isLoading ? 'Checking...' : 'Health Check'}
      </button>
    </div>
  );
}

// PropTypes definition for SearchBar
// eslint-disable-next-line react/prop-types
function SearchBar({ onSearch, onLookAhead }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const debounceTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (query) {
      onSearch(query);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Clear results if input is empty
    if (!value.trim()) {
      onSearch('');
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // Debounce the look-ahead search
    debounceTimeoutRef.current = setTimeout(async () => {
      if (value.trim().length >= 2) {
        setIsLoadingSuggestions(true);
        try {
          const results = await onLookAhead(value.trim());
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

  const handleSuggestionClick = (suggestion) => {
    console.log('🖱️ Clicked suggestion:', suggestion); // Debug log
    
    // Navigate to profile page for persons, otherwise do search
    if (suggestion.result_type === 'person') {
      // Use person_id if available, otherwise generate a dummy ID
    //   const id = suggestion.person_id || btoa(suggestion.search_name || suggestion.name).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
      const slug = suggestion.slug;
      console.log('🆔 Using slug for navigation:', slug);
      navigate(`/person/${slug}`);
    } else {
      const query = suggestion.search_name || suggestion.name;
      setInputValue(query);
      onSearch(query);
    }
    setShowDropdown(false);
  };

  const handleClear = () => {
    setInputValue('');
    setSuggestions([]);
    setShowDropdown(false);
    onSearch('');
  };

  // Close dropdown when clicking outside
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

  return (
    <div className="relative max-w-2xl mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search wrestlers, schools, coaches, or tournaments..."
            className="flex-1 px-4 py-3 pr-28 text-base border-2 border-gray-300 rounded-lg outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            autoComplete="off"
          />
          {inputValue && (
            <button 
              type="button" 
              onClick={handleClear}
              className="absolute right-20 bg-transparent border-none text-xl text-gray-600 cursor-pointer p-1 rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:text-gray-800"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button type="submit" className="absolute right-2 bg-blue-600 text-white border-none py-2 px-4 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 hover:bg-blue-700">
            Search
          </button>
        </div>
      </form>
      
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoadingSuggestions ? (
            <div className="flex items-center p-4 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-2"></div>
              <span>Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <div
                  key={`suggestion-${index}`}
                  className="flex items-center justify-between p-3 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0 text-left hover:bg-gray-50"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="flex-1 text-gray-800 font-medium text-left">
                    {toTitleCase(suggestion.search_name || suggestion.name)}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {suggestion.result_type === 'person' ? (
                      suggestion.roles && suggestion.roles.length > 0 ? (
                        suggestion.roles.map((role, roleIndex) => (
                          <span key={roleIndex} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-xl whitespace-nowrap">
                            {toTitleCase(role)}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-xl whitespace-nowrap">Person</span>
                      )
                    ) : (
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-xl whitespace-nowrap">
                        {toTitleCase(suggestion.result_type)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="p-4 text-center text-gray-600 italic">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
}

function HomePage() {
  // Search State
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (query) => {
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

  const handleLookAhead = async (query) => {
    // For look-ahead, we'll do a quick search with a smaller limit
    const results = await apiService.search(query, 5);
    console.log('🔍 Look-ahead API Response:', results); // Debug log
    console.log('🔍 First result:', results.results?.[0]); // Debug first result
    return results.results || [];
  };

  const browseCards = [
    {
      title: 'Browse Wrestlers',
      description: 'Discover wrestler profiles, stats, and career highlights',
      href: '/browse?type=wrestler',
      icon: '🤼'
    },
    {
      title: 'Browse Schools',
      description: 'Explore wrestling programs and team information',
      href: '/browse?type=school',
      icon: '🏫'
    },
    {
      title: 'Browse Coaches',
      description: 'Learn about coaching staff and their achievements',
      href: '/browse?type=coach',
      icon: '👨‍🏫'
    },
    {
      title: 'Browse Tournaments',
      description: 'View tournament brackets and championship results',
      href: '/browse?type=tournament',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-8xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
              D1 NCAA Wrestling Championship Data Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your comprehensive NCAA D1 Wrestling Championship data resource. 
              Search wrestlers, explore school programs, and view tournament brackets.
            </p>
          </div>
          
          {/* Search Interface */}
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} onLookAhead={handleLookAhead} />
          </div>
        </section>

        {/* Search Results */}
        {showResults && (
          <section className="mb-16">
            <SearchResults 
              results={searchResults}
              isLoading={isSearching}
              error={searchError}
              query={currentQuery}
            />
          </section>
        )}

        {/* Browse Cards - Hide when showing search results */}
        {!showResults && (
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Explore Wrestling Data</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">Discover comprehensive wrestling information across multiple categories</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {browseCards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1">
                  <div className="mb-4">
                    <div className="text-4xl mb-4 block">{card.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                  <div className="text-center">
                    <button className="w-full py-3 px-6 border border-primary bg-transparent text-primary rounded-md font-medium cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white">
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Health Check - Development Only */}
        <div className="fixed bottom-5 right-5 z-50">
          <HealthCheck />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
