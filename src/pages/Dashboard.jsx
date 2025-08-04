/* eslint-disable react/prop-types */
import useAuth from '../hooks/useAuth.jsx';

/**
 * Dashboard page component - displayed after successful login
 * @component
 * @returns {JSX.Element} The Dashboard page component
 */
function Dashboard() {
  const { user_id } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Welcome to MatIQ Dashboard
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            You have successfully logged in to your account
          </p>
        </div>

        {/* User Info Card */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                User ID:
              </span>
              <span className="text-neutral-900 dark:text-white font-mono">
                {user_id}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="font-medium text-green-700 dark:text-green-300">
                Authentication Status:
              </span>
              <span className="flex items-center text-green-600 dark:text-green-400">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Authenticated
              </span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <div className="card p-6 hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Profile Management
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="card p-6 hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Analytics
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              View detailed analytics and insights
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="card p-6 hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Settings
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Configure application settings and preferences
            </p>
          </div>
        </div>

        {/* API Integration Status */}
        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            API Integration Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                Backend Authentication - Connected
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                Token Storage - Active (localStorage)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                Session Management - Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;