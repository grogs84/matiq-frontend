import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './components/HomePage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import PersonProfile from './features/person/PersonProfile.jsx';
import { TournamentPage } from './features/tournament';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 font-sans">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/person/:slug" element={<PersonProfile />} />
            <Route path="/profile/:slug" element={<ProfilePage />} />
            <Route path="/tournament/:id/bracket" element={<TournamentPage />} />
            <Route path="/bracket-demo" element={<TournamentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
