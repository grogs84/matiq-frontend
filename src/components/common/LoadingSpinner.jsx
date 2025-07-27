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
    <div className={`${sizeClasses[size] || sizeClasses.medium} border-2 border-gray-300 border-t-primary rounded-full animate-spin`}>
    </div>
  );
}

export default LoadingSpinner;
