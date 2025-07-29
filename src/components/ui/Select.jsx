/* eslint-disable react/prop-types */
import { forwardRef } from 'react';

/**
 * Select component - dropdown select field
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of option objects with value and label
 * @param {string} [props.value] - Selected value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.disabled=false] - Whether the select is disabled
 * @param {boolean} [props.error=false] - Whether the select has an error state
 * @param {boolean} [props.fullWidth=false] - Whether the select should take full width
 * @param {string} [props.size='md'] - Select size ('sm' | 'md' | 'lg')
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.emptyLabel='Select an option'] - Label for empty state
 * @returns {JSX.Element} The Select component
 */
const Select = forwardRef(function Select({
  options = [],
  value,
  placeholder,
  disabled = false,
  error = false,
  fullWidth = false,
  size = 'md',
  className = '',
  onChange,
  emptyLabel = 'Select an option',
  ...props
}, ref) {
  // Base select classes
  const baseClasses = 'appearance-none bg-white dark:bg-neutral-800 border rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm pr-8',
    md: 'px-4 py-3 text-sm pr-10',
    lg: 'px-6 py-4 text-base pr-12'
  };
  
  // Error state classes
  const errorClasses = error 
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
    : 'border-neutral-300 dark:border-neutral-600';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const selectClasses = `${baseClasses} ${sizeClasses[size]} ${errorClasses} ${widthClasses} ${className}`;
  
  return (
    <div className={`relative ${widthClasses}`}>
      <select
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClasses}
        aria-invalid={error}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {!placeholder && !value && (
          <option value="">
            {emptyLabel}
          </option>
        )}
        {options.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
        <svg 
          className={`${size === 'sm' ? 'w-4 h-4 mr-2' : size === 'lg' ? 'w-6 h-6 mr-3' : 'w-5 h-5 mr-2.5'} text-neutral-400 dark:text-neutral-500`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;