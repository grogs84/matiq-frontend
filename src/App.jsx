import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage.jsx';
import ProfilePage from './components/ProfilePage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:slug" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
