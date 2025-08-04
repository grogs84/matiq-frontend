/* eslint-disable react/prop-types */
import { useState } from 'react';
import useAuth from '../hooks/useAuth.jsx';
import authService from '../services/authService.js';

/**
 * AuthExample - Demonstrates how to use the authentication system
 * Shows login, logout, and state management
 */
function AuthExample() {
  const { isAuthenticated, user_id, access_token, login, logout, isLoading } = useAuth();
  const [testResult, setTestResult] = useState(null);
  const [isTestingAuth, setIsTestingAuth] = useState(false);

  // Test authentication with demo credentials
  const testLogin = async () => {
    setIsTestingAuth(true);
    setTestResult(null);
    
    try {
      const response = await authService.login('test@example.com', 'testpassword');
      login(response.access_token, response.user_id);
      setTestResult({
        success: true,
        message: 'Authentication test successful!',
        data: response
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `Authentication test failed: ${error.message}`
      });
    } finally {
      setIsTestingAuth(false);
    }
  };

  const testLogout = () => {
    logout();
    setTestResult({
      success: true,
      message: 'Logout successful!'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Loading authentication state...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Authentication System Example
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Demonstrates the complete authentication flow with backend integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Auth State */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Current Authentication State
            </h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                isAuthenticated 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    isAuthenticated ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className={`font-medium ${
                    isAuthenticated 
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                  </span>
                </div>
              </div>

              {isAuthenticated && (
                <>
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      User ID:
                    </p>
                    <p className="text-neutral-900 dark:text-white font-mono text-sm">
                      {user_id}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Access Token:
                    </p>
                    <p className="text-neutral-900 dark:text-white font-mono text-xs break-all">
                      {access_token ? `${access_token.substring(0, 20)}...` : 'None'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      <strong>Storage:</strong> Tokens are stored in localStorage for development. 
                      In production, consider using httpOnly cookies for better security.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Test Controls */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Test Authentication
            </h2>
            
            <div className="space-y-4">
              {!isAuthenticated ? (
                <button
                  onClick={testLogin}
                  disabled={isTestingAuth}
                  className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isTestingAuth ? 'Testing Login...' : 'Test Login (Backend)'}
                </button>
              ) : (
                <button
                  onClick={testLogout}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Test Logout
                </button>
              )}

              {/* Test Result */}
              {testResult && (
                <div className={`p-4 rounded-lg ${
                  testResult.success 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <p className={`text-sm ${
                    testResult.success 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {testResult.message}
                  </p>
                  {testResult.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        Show Response Data
                      </summary>
                      <pre className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 p-2 rounded overflow-x-auto">
                        {JSON.stringify(testResult.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Demo Credentials Info */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Demo Credentials
                </h3>
                <div className="space-y-1 text-xs text-blue-600 dark:text-blue-300">
                  <p><strong>Email:</strong> test@example.com</p>
                  <p><strong>Password:</strong> testpassword</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Details */}
        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Integration Details
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
                Backend Integration
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• POST /api/v1/auth/login endpoint</li>
                <li>• JWT token-based authentication</li>
                <li>• Error handling for all scenarios</li>
                <li>• Network timeout protection</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
                State Management
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• React Context for global auth state</li>
                <li>• Persistent storage in localStorage</li>
                <li>• Automatic state restoration</li>
                <li>• Loading state handling</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
                Security Features
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Token storage (dev: localStorage)</li>
                <li>• Protected route handling</li>
                <li>• Automatic logout capability</li>
                <li>• Session persistence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Code Example */}
        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Usage Example
          </h2>
          <pre className="text-sm bg-neutral-100 dark:bg-neutral-800 p-4 rounded overflow-x-auto">
{`import useAuth from './hooks/useAuth';
import authService from './services/authService';

function MyComponent() {
  const { isAuthenticated, user_id, login, logout } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      login(response.access_token, response.user_id);
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleLogout = () => {
    logout();
    // Redirect to login page
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, User {user_id}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default AuthExample;