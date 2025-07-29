/* eslint-disable react/prop-types */
import { forwardRef } from 'react';

/**
 * Button component - flexible button with multiple variants and sizes
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button variant ('primary' | 'secondary' | 'accent' | 'outline' | 'ghost')
 * @param {string} [props.size='md'] - Button size ('sm' | 'md' | 'lg')
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {boolean} [props.loading=false] - Whether the button shows loading state
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type='button'] - Button type
 * @param {Function} [props.onClick] - Click handler
 * @param {Object} [props.icon] - Icon element to display
 * @param {string} [props.iconPosition='left'] - Icon position ('left' | 'right')
 * @returns {JSX.Element} The Button component
 */
const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  icon,
  iconPosition = 'left',
  ...props
}, ref) {
  // Base button classes
  const baseClasses = 'btn inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    accent: 'btn-accent',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-white',
    ghost: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md', 
    lg: 'btn-lg'
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Loading classes
  const loadingClasses = loading ? 'cursor-wait' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${loadingClasses} ${className}`;
  
  // Handle click - prevent if loading or disabled
  const handleClick = (e) => {
    if (loading || disabled) return;
    onClick?.(e);
  };
  
  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
    </svg>
  );
  
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className={children ? 'mr-2' : ''}>{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className={children ? 'ml-2' : ''}>{icon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;