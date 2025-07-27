/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from 'react-router-dom';

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
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-8xl mx-auto px-5 flex items-center justify-start h-16">
        <button 
          className={`
            bg-transparent border-none font-bold text-2xl cursor-pointer
            px-4 py-2 rounded-md transition-all duration-200 no-underline tracking-tight
            ${isHomePage 
              ? 'text-blue-400 cursor-default hover:bg-transparent hover:text-blue-400 hover:transform-none' 
              : 'text-white hover:bg-gray-700 hover:text-blue-400 hover:-translate-y-px active:translate-y-0'
            }
          `}
          onClick={handleHomeClick}
          aria-label="Go to homepage"
          style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
        >
          MatIQ
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
