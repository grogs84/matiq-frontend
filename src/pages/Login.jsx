/* eslint-disable react/prop-types */
import LoginForm from '../components/LoginForm.jsx';

/**
 * Login page component - renders the login form with proper layout
 * @component
 * @returns {JSX.Element} The Login page component
 */
function Login() {
  // Handle login form submission
  const handleLogin = (formData) => {
    // TODO: Implement actual authentication logic
    console.log('Login attempt:', formData);
    
    // For now, just show an alert with the form data
    alert(`Login attempt with:\nEmail: ${formData.email}\nPassword: ${'*'.repeat(formData.password.length)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Enter your credentials to access MatIQ
          </p>
        </div>

        {/* Login Form Card */}
        <div className="card p-8">
          <LoginForm 
            onSubmit={handleLogin}
            className="w-full"
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{' '}
            <button className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;