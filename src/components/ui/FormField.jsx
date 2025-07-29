/* eslint-disable react/prop-types */

/**
 * FormField component - wrapper for form fields with label and validation
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form field content (Input, Select, etc.)
 * @param {string} [props.label] - Field label
 * @param {string} [props.id] - Field ID (required if label is provided)
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The FormField component
 */
function FormField({
  children,
  label,
  id,
  required = false,
  error,
  helperText,
  className = ''
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * FormGroup component - for grouping multiple form fields
 */
FormField.Group = function FormGroup({ children, className = '', title, description }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {title && (
        <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormField;