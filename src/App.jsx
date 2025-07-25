import './App.css';
import { API_URL } from './config.js';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import apiService from './services/api.js';
import SearchResults from './components/SearchResults.jsx';

// Utility function to convert text to title case
const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Health Check Component
function HealthCheck() {
  const [status, setStatus] = useState('unknown');
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        setStatus('healthy');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClass = () => {
    if (isLoading) return 'loading';
    return status;
  };

  return (
    <div className="dev-health-check">
      <button 
        className="health-check-button" 
        onClick={checkHealth}
        disabled={isLoading}
      >
        <span className={`health-status ${getStatusClass()}`}></span>
        {isLoading ? 'Checking...' : 'Health Check'}
      </button>
    </div>
  );
}

// PropTypes definition for SearchBar
// eslint-disable-next-line react/prop-types
function SearchBar({ onSearch, onLookAhead }) {
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
    const query = suggestion.search_name || suggestion.name;
    setInputValue(query);
    onSearch(query);
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
    <div className="search-wrapper" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search wrestlers, schools, coaches, or tournaments..."
            className="search-input"
            autoComplete="off"
          />
          {inputValue && (
            <button 
              type="button" 
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      
      {showDropdown && (
        <div className="search-dropdown">
          {isLoadingSuggestions ? (
            <div className="dropdown-loading">
              <div className="loading-spinner-small"></div>
              <span>Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <div
                  key={`suggestion-${index}`}
                  className="dropdown-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-text">
                    {toTitleCase(suggestion.search_name || suggestion.name)}
                  </span>
                  <div className="suggestion-badges">
                    {suggestion.result_type === 'person' ? (
                      suggestion.roles && suggestion.roles.length > 0 ? (
                        suggestion.roles.map((role, roleIndex) => (
                          <span key={roleIndex} className="suggestion-type">
                            {toTitleCase(role)}
                          </span>
                        ))
                      ) : (
                        <span className="suggestion-type">Person</span>
                      )
                    ) : (
                      <span className="suggestion-type">
                        {toTitleCase(suggestion.result_type)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="dropdown-empty">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
}

// Mock data for featured wrestlers
const featuredWrestlers = [
  {
    id: 1,
    name: "Alex Rodriguez",
    weight_class: 165,
    school_name: "Penn State",
    wins: 28,
    losses: 3
  },
  {
    id: 2,
    name: "Michael Thompson",
    weight_class: 174,
    school_name: "Iowa",
    wins: 31,
    losses: 2
  },
  {
    id: 3,
    name: "David Martinez",
    weight_class: 184,
    school_name: "Oklahoma State",
    wins: 26,
    losses: 4
  }
];

function App() {
  // Search state management
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      // Clear results if empty query
      setSearchResults(null);
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
    <div className="app">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              D1 NCAA Wrestling Championship Data Hub
            </h1>
            <p className="hero-description">
              Your comprehensive NCAA D1 Wrestling Championship data resource. 
              Search wrestlers, explore school programs, and view tournament brackets.
            </p>
          </div>
          
          {/* Search Interface */}
          <div className="search-section">
            <SearchBar onSearch={handleSearch} onLookAhead={handleLookAhead} />
          </div>
        </section>

        {/* Search Results */}
        {showResults && (
          <section className="search-results-section">
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
          <section className="browse-section">
          <div className="section-header">
            <h2 className="section-title">Explore Wrestling Data</h2>
            <p className="section-description">Discover comprehensive wrestling information across multiple categories</p>
          </div>
          
          <div className="browse-grid">
            {browseCards.map((card, index) => (
              <div key={index} className="browse-card">
                <div className="card-header">
                  <div className="card-icon">{card.icon}</div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
                <div className="card-content">
                  <button className="explore-button">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Featured Content - Hide when showing search results */}
        {!showResults && (
          <section className="featured-section">
          <div className="section-header">
            <h2 className="section-title">Featured Wrestlers</h2>
            <p className="section-description">Spotlight on top performers in NCAA wrestling</p>
          </div>
          
          <div className="featured-grid">
            {featuredWrestlers.map((wrestler) => (
              <div key={wrestler.id} className="wrestler-card">
                <div className="wrestler-header">
                  <div className="wrestler-avatar">
                    <span className="avatar-initials">
                      {wrestler.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="wrestler-info">
                    <h3 className="wrestler-name">{wrestler.name}</h3>
                    <p className="wrestler-details">
                      {wrestler.weight_class} lbs • {wrestler.school_name}
                    </p>
                  </div>
                </div>
                <div className="wrestler-stats">
                  <div className="stat">
                    <span className="stat-value">{wrestler.wins}</span>
                    <span className="stat-label">Wins</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{wrestler.losses}</span>
                    <span className="stat-label">Losses</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-footer">
            <button className="view-all-button">
              View All Wrestlers
            </button>
          </div>
        </section>
        )}
      </div>
      
      {/* Development Health Check Button */}
      <HealthCheck />
    </div>
  );
}

export default App;