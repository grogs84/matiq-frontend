/* eslint-disable react/prop-types */

/**
 * Card component - provides flexible card layout using composition pattern
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the card
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.hover=false] - Whether to show hover effects
 * @param {boolean} [props.clickable=false] - Whether the card is clickable
 * @param {Function} [props.onClick] - Click handler for clickable cards
 * @param {string} [props.padding='p-6'] - Padding classes
 * @returns {JSX.Element} The Card component
 */
function Card({ 
  children, 
  className = '', 
  hover = false,
  clickable = false,
  onClick,
  padding = 'p-6'
}) {
  const baseClasses = 'card';
  const hoverClasses = hover ? 'hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-600 hover:-translate-y-0.5 group cursor-pointer transform transition-all duration-300 hover:scale-105' : '';
  const clickableClasses = clickable ? 'cursor-pointer' : '';
  
  const combinedClasses = `${baseClasses} ${hoverClasses} ${clickableClasses} ${padding} ${className}`;

  const CardElement = clickable ? 'button' : 'div';

  return (
    <CardElement className={combinedClasses} onClick={onClick}>
      {children}
    </CardElement>
  );
}

/**
 * CardHeader component - for card headers with consistent styling
 */
Card.Header = function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

/**
 * CardContent component - for main card content
 */
Card.Content = function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

/**
 * CardFooter component - for card footers with consistent styling
 */
Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;