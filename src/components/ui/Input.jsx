/* eslint-disable react/prop-types */
import { forwardRef } from 'react';

/**
 * Input component - flexible input field with validation and different variants
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.variant='default'] - Input variant ('default' | 'search' | 'outlined')
 * @param {string} [props.size='md'] - Input size ('sm' | 'md' | 'lg')
 * @param {string} [props.value] - Input value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.readonly=false] - Whether the input is readonly
 * @param {boolean} [props.error=false] - Whether the input has an error state
 * @param {boolean} [props.fullWidth=false] - Whether the input should take full width
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onFocus] - Focus handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {React.ReactNode} [props.leftIcon] - Icon to display on the left
 * @param {React.ReactNode} [props.rightIcon] - Icon to display on the right
 * @param {string} [props.errorMessage] - Error message to display
 * @param {string} [props.helperText] - Helper text to display
 * @returns {JSX.Element} The Input component
 */
const Input = forwardRef(function Input({
  type = 'text',
  variant = 'default',
  size = 'md',
  value,
  placeholder,
  disabled = false,
  readonly = false,
  error = false,
  fullWidth = false,
  className = '',
  onChange,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
  errorMessage,
  helperText,
  ...props
}, ref) {
  // Base input classes
  const baseClasses = 'w-full transition-all duration-200 focus:outline-none';
  
  // Variant classes
  const variantClasses = {
    default: 'input-field',
    search: 'w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-neutral-300 dark:border-neutral-600 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 shadow-lg hover:shadow-xl',
    outlined: 'px-4 py-3 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
  };
  
  // Size classes (for default variant)
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };
  
  // Error state classes
  const errorClasses = error 
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
    : '';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed bg-neutral-100 dark:bg-neutral-700' 
    : '';
  
  // Build input classes
  let inputClasses;
  if (variant === 'default') {
    inputClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${widthClasses} ${disabledClasses} ${className}`;
  } else {
    inputClasses = `${baseClasses} ${variantClasses[variant]} ${errorClasses} ${widthClasses} ${disabledClasses} ${className}`;
  }
  
  const inputElement = (
    <input
      ref={ref}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      className={inputClasses}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-invalid={error}
      aria-describedby={errorMessage ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
      {...props}
    />
  );
  
  // If no icons and no messages, return simple input
  if (!leftIcon && !rightIcon && !errorMessage && !helperText) {
    return inputElement;
  }
  
  // Wrapper for inputs with icons or messages
  return (
    <div className={widthClasses}>
      {/* Input with icons */}
      {(leftIcon || rightIcon) ? (
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-neutral-400 dark:text-neutral-500">
                {leftIcon}
              </span>
            </div>
          )}
          <input
            ref={ref}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            className={`${inputClasses} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-invalid={error}
            aria-describedby={errorMessage ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-neutral-400 dark:text-neutral-500">
                {rightIcon}
              </span>
            </div>
          )}
        </div>
      ) : (
        inputElement
      )}
      
      {/* Error message */}
      {errorMessage && (
        <p id={`${props.id}-error`} className="mt-2 text-sm text-error-600 dark:text-error-400">
          {errorMessage}
        </p>
      )}
      
      {/* Helper text */}
      {helperText && !errorMessage && (
        <p id={`${props.id}-helper`} className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;