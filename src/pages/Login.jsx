/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import useAuth from '../hooks/useAuth.jsx';
import authService from '../services/authService.js';

/**
 * Login page component - renders the login form with proper layout
 * @component
 * @returns {JSX.Element} The Login page component
 */
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // Handle login form submission
  const handleLogin = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('🔐 Attempting login for:', formData.email);
      
      // Call the auth service to login
      const response = await authService.login(formData.email, formData.password);
      
      // Update auth state
      login(response.access_token, response.user_id);
      
      console.log('✅ Login successful, redirecting to:', from);
      
      // Redirect to intended destination or dashboard
      navigate(from, { replace: true });
    } catch (err) {
      console.error('❌ Login failed:', err.message);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          <LoginForm 
            onSubmit={handleLogin}
            isSubmitting={isSubmitting}
            className="w-full"
          />

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Demo Credentials for Testing
            </h3>
            <div className="space-y-1 text-xs text-blue-600 dark:text-blue-300">
              <p><strong>Email:</strong> test@example.com</p>
              <p><strong>Password:</strong> testpassword</p>
            </div>
            <p className="mt-2 text-xs text-blue-500 dark:text-blue-400">
              Use these credentials to test the authentication flow with the backend.
            </p>
          </div>
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