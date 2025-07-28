/* eslint-disable react/prop-types */
import Section from './common/Section.jsx';

/**
 * SearchHero component - displays the main hero section with title, stats, and flexible search content
 * Uses composition pattern to accept any search-related content as children
 * @component
 * @param {React.ReactNode} children - Search component(s) to render
 * @param {Object} [stats] - Optional stats override
 * @returns {JSX.Element} The SearchHero component
 */
function SearchHero({ children, stats }) {
  const defaultStats = [
    { value: '10K+', label: 'Wrestlers' },
    { value: '300+', label: 'Schools' },
    { value: '50+', label: 'Tournaments' }
  ];

  const heroStats = stats || defaultStats;

  return (
    <Section spacing="pt-8 sm:pt-16 pb-12" centered>
      <div className="max-w-4xl mx-auto">
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
          {heroStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Search Interface - uses children composition pattern */}
      <div className="mb-8">
        {children}
      </div>
    </Section>
  );
}

export default SearchHero;