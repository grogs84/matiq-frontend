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

function FeaturedSection() {
  return (
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
  );
}

export default FeaturedSection;