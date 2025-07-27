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
    <div className={`loading-spinner ${sizeClasses[size] || sizeClasses.medium}`}>
      <div className="spinner-inner"></div>
    </div>
  );
}

export default LoadingSpinner;
