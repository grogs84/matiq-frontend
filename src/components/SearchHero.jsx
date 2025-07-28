import SearchBar from './SearchBar.jsx';

// eslint-disable-next-line react/prop-types
function SearchHero({ onSearch }) {
  return (
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
        <SearchBar onSearch={onSearch} />
      </div>
    </section>
  );
}

export default SearchHero;