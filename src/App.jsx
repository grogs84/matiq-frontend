import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import HomePage from './components/HomePage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import PersonProfile from './features/person/PersonProfile.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/person/:slug" element={<PersonProfile />} />
          <Route path="/profile/:slug" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
