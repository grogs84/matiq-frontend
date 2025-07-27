import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.jsx';
import PersonProfile from './components/PersonProfile/PersonProfile.jsx';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/person/:slug" element={<PersonProfile />} />
      </Routes>
    </div>
  );
}

export default App;
