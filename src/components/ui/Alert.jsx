/* eslint-disable react/prop-types */
import { useState } from 'react';

/**
 * Alert component - for displaying status messages, warnings, and notifications
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Alert content
 * @param {string} [props.variant='info'] - Alert variant ('success' | 'warning' | 'error' | 'info')
 * @param {boolean} [props.dismissible=false] - Whether the alert can be dismissed
 * @param {Function} [props.onDismiss] - Dismiss handler
 * @param {string} [props.title] - Alert title
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.icon] - Custom icon to display
 * @param {boolean} [props.showIcon=true] - Whether to show default icons
 * @returns {JSX.Element|null} The Alert component
 */
function Alert({
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  title,
  className = '',
  icon,
  showIcon = true,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };
  
  if (!isVisible) return null;
  
  // Base alert classes
  const baseClasses = 'relative rounded-lg border p-4 shadow-sm';
  
  // Variant classes
  const variantClasses = {
    success: 'bg-success-50 border-success-200 text-success-800 dark:bg-success-900/20 dark:border-success-800 dark:text-success-300',
    warning: 'bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-900/20 dark:border-warning-800 dark:text-warning-300',
    error: 'bg-error-50 border-error-200 text-error-800 dark:bg-error-900/20 dark:border-error-800 dark:text-error-300',
    info: 'bg-primary-50 border-primary-200 text-primary-800 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-300'
  };
  
  // Default icons for each variant
  const defaultIcons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )
  };
  
  // Combine all classes
  const alertClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={alertClasses} role="alert" {...props}>
      <div className="flex">
        {/* Icon */}
        {(showIcon || icon) && (
          <div className="flex-shrink-0">
            {icon || defaultIcons[variant]}
          </div>
        )}
        
        {/* Content */}
        <div className={`${(showIcon || icon) ? 'ml-3' : ''} flex-1`}>
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          <div className={`text-sm ${title ? '' : 'font-medium'}`}>
            {children}
          </div>
        </div>
        
        {/* Dismiss button */}
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className="inline-flex rounded-md bg-transparent p-1.5 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current transition-colors"
              onClick={handleDismiss}
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Alert;