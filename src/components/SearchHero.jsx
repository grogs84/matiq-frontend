/* eslint-disable react/prop-types */
import SearchBar from './SearchBar.jsx';

/**
 * SearchHero component - displays the main hero section with title, stats, and search bar
 * @component
 * @param {Object} searchProps - All search-related props to pass to SearchBar
 * @returns {JSX.Element} The SearchHero component
 */
function SearchHero({ searchProps }) {
  return (
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
        <SearchBar {...searchProps} />
      </div>
    </section>
  );
}

export default SearchHero;