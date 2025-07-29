/* eslint-disable react/prop-types */

/**
 * Section component - provides flexible section layout using composition pattern
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the section
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.spacing='pb-12'] - Spacing classes
 * @param {boolean} [props.centered=false] - Whether to center the content
 * @returns {JSX.Element} The Section component
 */
function Section({ 
  children, 
  className = '', 
  spacing = 'pb-12',
  centered = false
}) {
  const centerClasses = centered ? 'text-center' : '';
  const combinedClasses = `${spacing} ${centerClasses} ${className}`;

  return (
    <section className={combinedClasses}>
      {children}
    </section>
  );
}

/**
 * SectionHeader component - for section headers with consistent styling
 */
Section.Header = function SectionHeader({ children, className = '' }) {
  return (
    <div className={`mb-8 sm:mb-12 ${className}`}>
      {children}
    </div>
  );
};

/**
 * SectionTitle component - for section titles
 */
Section.Title = function SectionTitle({ children, className = '', size = 'large' }) {
  const sizeClasses = {
    large: 'text-2xl sm:text-3xl md:text-4xl',
    medium: 'text-xl sm:text-2xl md:text-3xl',
    small: 'text-lg sm:text-xl md:text-2xl'
  };

  return (
    <h2 className={`${sizeClasses[size]} font-bold font-display text-neutral-900 dark:text-white mb-4 ${className}`}>
      {children}
    </h2>
  );
};

/**
 * SectionDescription component - for section descriptions
 */
Section.Description = function SectionDescription({ children, className = '' }) {
  return (
    <p className={`text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto px-4 ${className}`}>
      {children}
    </p>
  );
};

export default Section;