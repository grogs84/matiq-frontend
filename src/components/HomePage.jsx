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

  const getStatusStyles = () => {
    switch (healthStatus) {
      case 'healthy': 
        return {
          dot: 'bg-success-500 shadow-success-500/50',
          text: 'text-success-700 dark:text-success-400',
          bg: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800/30'
        };
      case 'unhealthy': 
        return {
          dot: 'bg-error-500 shadow-error-500/50',
          text: 'text-error-700 dark:text-error-400',
          bg: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800/30'
        };
      default: 
        return {
          dot: 'bg-warning-500 shadow-warning-500/50',
          text: 'text-warning-700 dark:text-warning-400',
          bg: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800/30'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button 
        className={`flex items-center space-x-2 ${styles.bg} border rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm`}
        onClick={checkHealth}
        disabled={isLoading}
      >
        <span className={`w-2 h-2 rounded-full ${styles.dot} ${isLoading ? 'animate-pulse' : 'shadow-lg'}`}></span>
        <span className={`text-sm font-medium ${styles.text}`}>
          {isLoading ? 'Checking...' : 'Health Check'}
        </span>
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
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-0" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search wrestlers, schools, coaches, or tournaments..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-20 sm:pr-24 text-base sm:text-lg border-2 border-neutral-300 dark:border-neutral-600 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-glow"
            autoComplete="off"
          />
          {inputValue && (
            <button 
              type="button" 
              onClick={handleClear}
              className="absolute right-16 sm:right-20 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-xl w-6 h-6 flex items-center justify-center transition-colors duration-200"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary btn-sm sm:btn-md px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-glow"
          >
            <span className="hidden sm:inline">Search</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      
      {showDropdown && (
        <div className="absolute top-full left-4 right-4 sm:left-0 sm:right-0 mt-2 glass border border-neutral-200/50 dark:border-neutral-700/50 rounded-xl sm:rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto animate-slide-down">
          {isLoadingSuggestions ? (
            <div className="flex items-center justify-center py-6 text-neutral-600 dark:text-neutral-400">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-300 dark:border-neutral-600 border-t-primary-600 mr-3"></div>
              <span className="loading-dots">Searching</span>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <div
                  key={`suggestion-${index}`}
                  className="px-4 py-3 hover:bg-neutral-50/80 dark:hover:bg-neutral-700/50 cursor-pointer border-b border-neutral-100/50 dark:border-neutral-700/50 last:border-b-0 transition-all duration-200 group"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-800 dark:text-neutral-200 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {toTitleCase(suggestion.search_name || suggestion.name)}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.result_type === 'person' ? (
                        suggestion.roles && suggestion.roles.length > 0 ? (
                          suggestion.roles.map((role, roleIndex) => (
                            <span key={roleIndex} className="badge-primary">
                              {toTitleCase(role)}
                            </span>
                          ))
                        ) : (
                          <span className="badge-primary">Person</span>
                        )
                      ) : (
                        <span className="badge-secondary">
                          {toTitleCase(suggestion.result_type)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="px-4 py-6 text-neutral-500 dark:text-neutral-400 text-center">
              <div className="text-2xl mb-2">🔍</div>
              <div>No suggestions found</div>
            </div>
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
    <div className="min-h-screen hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-8 sm:pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            {/* Mobile-first heading with responsive sizing */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-neutral-900 dark:text-white mb-6 leading-tight">
              <span className="block">D1 NCAA Wrestling</span>
              <span className="gradient-text">Championship Data Hub</span>
            </h1>
            
            {/* Enhanced description with better mobile typography */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
              Your comprehensive NCAA D1 Wrestling Championship data resource. 
              Search wrestlers, explore school programs, and view tournament brackets.
            </p>
            
            {/* Stats row for credibility - mobile responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Wrestlers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">300+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Schools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Tournaments</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search Interface */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} onLookAhead={handleLookAhead} />
          </div>
        </section>

        {/* Search Results */}
        {showResults && (
          <section className="pb-12">
            <SearchResults 
              results={searchResults}
              isLoading={isSearching}
              error={searchError}
              query={currentQuery}
            />
          </section>
        )}

        {/* Browse Cards - Enhanced mobile-first design */}
        {!showResults && (
          <section className="pb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-neutral-900 dark:text-white mb-4">
                Explore Wrestling Data
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto px-4">
                Discover comprehensive wrestling information across multiple categories
              </p>
            </div>
            
            {/* Enhanced grid with better mobile spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {browseCards.map((card, index) => (
                <div 
                  key={index} 
                  className="card-hover p-6 group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce-subtle">
                      {card.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-6 text-sm leading-relaxed">
                      {card.description}
                    </p>
                    <button className="btn-primary btn-md w-full group-hover:shadow-glow">
                      <span>Explore</span>
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Health Check */}
        <HealthCheck />
      </div>
    </div>
  );
}

export default HomePage;
