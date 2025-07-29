/* eslint-disable react/prop-types */

/**
 * Layout component - provides flexible page layout using composition pattern
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the layout
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.background] - Background style ('gradient' | 'solid' | 'transparent')
 * @param {boolean} [props.maxWidth=true] - Whether to apply max-width container
 * @param {boolean} [props.padding=true] - Whether to apply default padding
 * @returns {JSX.Element} The Layout component
 */
function Layout({ 
  children, 
  className = '', 
  background = 'solid',
  maxWidth = true,
  padding = true
}) {
  const backgroundClasses = {
    gradient: 'hero-gradient',
    solid: 'bg-neutral-50 dark:bg-neutral-900',
    transparent: ''
  };

  const baseClasses = `min-h-screen ${backgroundClasses[background]} ${className}`;
  const containerClasses = maxWidth ? 'max-w-7xl mx-auto' : '';
  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <div className={baseClasses}>
      <div className={`${containerClasses} ${paddingClasses}`}>
        {children}
      </div>
    </div>
  );
}

export default Layout;