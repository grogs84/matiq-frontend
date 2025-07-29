/* eslint-disable react/prop-types */

/**
 * Badge component - flexible badge for labels, status indicators, and tags
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} [props.variant='primary'] - Badge variant ('primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info')
 * @param {string} [props.size='md'] - Badge size ('sm' | 'md' | 'lg')
 * @param {boolean} [props.removable=false] - Whether the badge can be removed
 * @param {Function} [props.onRemove] - Remove handler for removable badges
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.icon] - Icon to display in the badge
 * @param {boolean} [props.outlined=false] - Whether to show outlined variant
 * @returns {JSX.Element} The Badge component
 */
function Badge({
  children,
  variant = 'primary',
  size = 'md',
  removable = false,
  onRemove,
  className = '',
  icon,
  outlined = false,
  ...props
}) {
  // Base badge classes
  const baseClasses = 'badge inline-flex items-center font-medium';
  
  // Variant classes - both filled and outlined versions
  const variantClasses = {
    primary: outlined 
      ? 'text-primary-700 border border-primary-300 bg-transparent dark:text-primary-300 dark:border-primary-600'
      : 'badge-primary',
    secondary: outlined
      ? 'text-neutral-700 border border-neutral-300 bg-transparent dark:text-neutral-300 dark:border-neutral-600'
      : 'badge-secondary',
    success: outlined
      ? 'text-success-700 border border-success-300 bg-transparent dark:text-success-300 dark:border-success-600'
      : 'badge-success',
    warning: outlined
      ? 'text-warning-700 border border-warning-300 bg-transparent dark:text-warning-300 dark:border-warning-600'
      : 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300',
    error: outlined
      ? 'text-error-700 border border-error-300 bg-transparent dark:text-error-300 dark:border-error-600'
      : 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300',
    info: outlined
      ? 'text-primary-700 border border-primary-300 bg-transparent dark:text-primary-300 dark:border-primary-600'
      : 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  };
  
  // Combine all classes
  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // Remove button icon
  const RemoveIcon = () => (
    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
  
  return (
    <span className={badgeClasses} {...props}>
      {icon && (
        <span className={children ? 'mr-1' : ''}>
          {icon}
        </span>
      )}
      {children}
      {removable && onRemove && (
        <button 
          type="button"
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
          aria-label="Remove"
        >
          <RemoveIcon />
        </button>
      )}
    </span>
  );
}

/**
 * BadgeGroup component - for grouping multiple badges
 */
Badge.Group = function BadgeGroup({ children, className = '', spacing = 'gap-2' }) {
  return (
    <div className={`flex flex-wrap items-center ${spacing} ${className}`}>
      {children}
    </div>
  );
};

export default Badge;