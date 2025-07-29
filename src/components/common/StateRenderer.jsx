/* eslint-disable react/prop-types */
import LoadingSpinner from './LoadingSpinner.jsx';

/**
 * StateRenderer component - uses render props pattern for loading/error/success states
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.loading - Whether content is loading
 * @param {string|null} props.error - Error message if any
 * @param {*} props.data - Data to render when successful
 * @param {Function} props.children - Render function that receives (data, { loading, error })
 * @param {Function} [props.renderLoading] - Custom loading renderer
 * @param {Function} [props.renderError] - Custom error renderer
 * @param {string} [props.loadingMessage] - Custom loading message
 * @returns {JSX.Element} The StateRenderer component
 */
function StateRenderer({ 
  loading, 
  error, 
  data, 
  children,
  renderLoading,
  renderError,
  loadingMessage = 'Loading...'
}) {
  // Render loading state
  if (loading) {
    if (renderLoading) {
      return renderLoading();
    }
    
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <LoadingSpinner />
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">{loadingMessage}</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    if (renderError) {
      return renderError(error);
    }
    
    return (
      <div className="card p-8 text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          Something went wrong
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  // Render success state using children as render prop
  return children(data, { loading, error });
}

export default StateRenderer;