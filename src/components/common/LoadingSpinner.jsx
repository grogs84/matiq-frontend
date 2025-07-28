/* eslint-disable react/prop-types */
/**
 * Loading spinner component
 */
function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-neutral-200 dark:border-neutral-700 border-t-primary-600 dark:border-t-primary-400 ${sizeClasses[size] || sizeClasses.medium}`}>
    </div>
  );
}

export default LoadingSpinner;
