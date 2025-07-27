/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navigation bar component with MatIQ branding
 */
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleHomeClick = () => {
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button 
          className={`navbar-brand ${isHomePage ? 'home' : ''}`}
          onClick={handleHomeClick}
          aria-label="Go to homepage"
        >
          MatIQ
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
