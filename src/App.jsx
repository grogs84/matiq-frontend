import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Wrestling Data Hub</h1>
        <p>Your premier destination for wrestling analytics and insights</p>
      </header>
      
      <main className="app-main">
        <div className="welcome-card">
          <h2>Welcome to Wrestling Data Hub</h2>
          <p>Discover comprehensive wrestling statistics, match analysis, and performance insights all in one place.</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🤼</span>
              <h3>Match Statistics</h3>
              <p>Detailed analysis of wrestling matches, techniques, and outcomes</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3>Performance Analytics</h3>
              <p>Track wrestler performance metrics and statistical trends</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🏆</span>
              <h3>Tournament Results</h3>
              <p>Comprehensive tournament brackets and championship records</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📈</span>
              <h3>Trend Analysis</h3>
              <p>Historical data and predictive insights for wrestling events</p>
            </div>
          </div>
          
          <div className="action-section">
            <h3>Explore Wrestling Data</h3>
            <p>Start your journey into wrestling analytics with our comprehensive dataset</p>
            <button className="cta-button">Coming Soon</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;