import './App.css';

// PropTypes definition for SearchBar
// eslint-disable-next-line react/prop-types
function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search wrestlers, schools, coaches, or tournaments..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </div>
    </form>
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
  const handleSearch = (query) => {
    console.log('Searching for:', query);
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
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Browse Cards */}
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

        {/* Featured Content */}
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
      </div>
    </div>
  );
}

export default App;