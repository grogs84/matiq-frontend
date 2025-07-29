/* eslint-disable react/prop-types */
import LoadingSpinner from './LoadingSpinner.jsx';

/**
 * WithState HOC - Higher-order component pattern for state management
 * @param {React.Component} WrappedComponent - Component to wrap
 * @returns {React.Component} Enhanced component with state handling
 */
function withState(WrappedComponent) {
  return function WithStateComponent(props) {
    const { loading, error, ...otherProps } = props;

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <LoadingSpinner />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      );
    }

    if (error) {
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

    return <WrappedComponent {...otherProps} />;
  };
}

export default withState;