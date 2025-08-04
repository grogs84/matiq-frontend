/* eslint-disable react/prop-types */
import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';

/**
 * LoginFormExample - Demonstrates how to use the LoginForm component
 * This example shows all the features and how to integrate with authentication
 */
function LoginFormExample() {
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Example submission handler
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept specific credentials
      if (formData.email === 'demo@example.com' && formData.password === 'demo123') {
        setSubmissionResult({
          success: true,
          message: 'Login successful! (Demo mode)',
          data: { user_id: 'demo-user-123', access_token: 'demo-token-xyz' }
        });
        
        // In real app, you would call your auth service:
        // const response = await authService.login(formData.email, formData.password);
        // login(response.access_token, response.user_id);
      } else {
        setSubmissionResult({
          success: false,
          message: 'Invalid credentials. Try demo@example.com / demo123'
        });
      }
    } catch (error) {
      setSubmissionResult({
        success: false,
        message: `Error: ${error.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            LoginForm Component Example
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Interactive demonstration of the LoginForm component with validation and submission
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Demo */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Live Demo
            </h2>
            
            <LoginForm 
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />

            {/* Result Display */}
            {submissionResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                submissionResult.success 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <p className={`text-sm ${
                  submissionResult.success 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {submissionResult.message}
                </p>
                {submissionResult.data && (
                  <pre className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {JSON.stringify(submissionResult.data, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* Features & Usage */}
          <div className="space-y-6">
            {/* Features */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email & password validation
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time error messages
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Loading state management
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dark mode support
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Accessibility compliant
                </li>
              </ul>
            </div>

            {/* Usage Example */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Usage Example
              </h3>
              <pre className="text-xs bg-neutral-100 dark:bg-neutral-800 p-3 rounded overflow-x-auto">
{`import LoginForm from './components/LoginForm';

function LoginPage() {
  const handleLogin = async (formData) => {
    const response = await authService.login(
      formData.email, 
      formData.password
    );
    // Handle success
  };

  return (
    <LoginForm 
      onSubmit={handleLogin}
      isSubmitting={loading}
    />
  );
}`}
              </pre>
            </div>

            {/* Test Credentials */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                Test Credentials
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="font-medium text-blue-800 dark:text-blue-200">Demo Account</p>
                  <p className="text-blue-600 dark:text-blue-300">Email: demo@example.com</p>
                  <p className="text-blue-600 dark:text-blue-300">Password: demo123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormExample;