import './App.css';
import { API_URL } from './config.js';  // Add this import!

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>MatIQ</h1>
        <p>A modern web application</p>
      </header>
      
      <main className="app-main">
        <div className="welcome-card">
          <h2>Welcome to Matiq</h2>
          <p>Your application is ready for development!</p>
          
          <div className="quick-links">
            <a 
              href={`${API_URL}/docs`}
              target="_blank" 
              rel="noopener noreferrer"
              className="link-button"
            >
              📚 API Documentation
            </a>
            <a 
              href={`${API_URL}/health`}
              target="_blank" 
              rel="noopener noreferrer"
              className="link-button"
            >
              ❤️ Health Check
            </a>
          </div>
          
          {/* Debug info - remove this after testing */}
          <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', fontSize: '12px' }}>
            <strong>Debug Info:</strong><br />
            Current API URL: {API_URL}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;