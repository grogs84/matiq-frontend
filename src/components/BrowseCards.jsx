/* eslint-disable react/prop-types */
/**
 * BrowseCards component - displays browseable categories when no search results are shown
 * @component
 * @param {boolean} showResults - Whether search results are currently displayed
 * @returns {JSX.Element|null} The BrowseCards component or null if results are shown
 */
function BrowseCards({ showResults }) {
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

  if (showResults) {
    return null;
  }

  return (
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
  );
}

export default BrowseCards;