function BrowseSection() {
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
  );
}

export default BrowseSection;