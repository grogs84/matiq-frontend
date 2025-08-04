import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './components/HomePage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import PersonProfile from './features/person/PersonProfile.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LoginFormExample from './examples/LoginFormExample.jsx';
import AuthExample from './examples/AuthExample.jsx';

/* eslint-disable react/prop-types */
/**
 * Private route wrapper that redirects authenticated users away from login
 */
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 font-sans">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/examples/login-form" element={<LoginFormExample />} />
              <Route path="/examples/auth" element={<AuthExample />} />
              <Route path="/person/:slug" element={<PersonProfile />} />
              <Route path="/profile/:slug" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
