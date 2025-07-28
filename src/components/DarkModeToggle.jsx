/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

/**
 * Dark mode toggle component with smooth transitions
 */
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex h-10 w-18 items-center rounded-full bg-neutral-200 dark:bg-neutral-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`inline-block h-8 w-8 transform rounded-full bg-white dark:bg-neutral-900 shadow-lg transition-transform duration-300 ${isDark ? 'translate-x-8' : 'translate-x-1'}`}>
        <span className="flex h-full w-full items-center justify-center text-sm">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}

export default DarkModeToggle;
