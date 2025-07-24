import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>� Matiq</h1>
        <p>A modern web application</p>
      </header>
      
      <main className="app-main">
        <div className="welcome-card">
          <h2>Welcome to Matiq</h2>
          <p>Your application is ready for development!</p>
          
          <div className="quick-links">
            <a 
              href="http://localhost:8000/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-button"
            >
              📚 API Documentation
            </a>
            <a 
              href="http://localhost:8000/health" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-button"
            >
              ❤️ Health Check
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
