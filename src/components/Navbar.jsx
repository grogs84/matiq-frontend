/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle.jsx';
import useAuth from '../hooks/useAuth.jsx';

/**
 * Navigation bar component with MatIQ branding and dark mode
 */
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  
  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/50 dark:border-neutral-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            className={`group flex items-center space-x-3 transition-all duration-300 ${
              isHomePage 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-neutral-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
            }`}
            onClick={handleHomeClick}
            aria-label="Go to homepage"
          >
            <div className="relative">
              <div className="text-2xl font-bold font-display transition-transform duration-300 group-hover:scale-105">
                MatIQ
              </div>
              {isHomePage && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </button>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {/* Search shortcut hint - only show on larger screens */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
              <kbd className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded">
                Ctrl
              </kbd>
              <span>+</span>
              <kbd className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded">
                K
              </kbd>
              <span className="ml-1">to search</span>
            </div>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Authentication */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
