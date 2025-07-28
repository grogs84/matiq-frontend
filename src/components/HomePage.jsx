import SearchHero from './SearchHero.jsx';
import BrowseSection from './BrowseSection.jsx';
import FeaturedSection from './FeaturedSection.jsx';
import HealthCheck from './HealthCheck.jsx';

function HomePage() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="app">
      <div className="container">
        <SearchHero onSearch={handleSearch} />
        <BrowseSection />
        <FeaturedSection />
      </div>
      
      {/* Development Health Check Button */}
      <HealthCheck />
    </div>
  );
}

export default HomePage;