# MatIQ Frontend Authentication System

## Overview

This document provides comprehensive instructions for testing and using the MatIQ frontend authentication system. The implementation includes a complete login flow with backend integration, state management, and security best practices.

## 🔧 Setup and Configuration

### Environment Variables

The authentication system connects to the MatIQ backend. Configure the API URL:

```bash
# .env.local
VITE_API_URL=https://matiq-backend-production.up.railway.app
```

Default backend URL: `https://matiq-backend-production.up.railway.app`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## 🔑 Demo Credentials

For testing the authentication system, use these demo credentials:

### Backend Integration Test
- **Email:** `test@example.com`
- **Password:** `testpassword`

### Example Demo (Local)
- **Email:** `demo@example.com`
- **Password:** `demo123`

## 🧪 Testing Authentication

### 1. Manual Testing Steps

#### Login Flow Test
1. Visit `/login` in your browser
2. Enter the demo credentials above
3. Click "Login" button
4. Verify:
   - Loading state appears during submission
   - Successful login redirects to `/dashboard`
   - User information displays correctly
   - Authentication state persists on page refresh

#### Error Handling Test
1. Visit `/login`
2. Test various error scenarios:
   - **Empty fields:** Leave email or password empty, try to submit
   - **Invalid email:** Enter invalid email format (e.g., `test@`)
   - **Wrong credentials:** Enter incorrect password
   - **Network error:** Disconnect internet and try to login

#### Logout Test
1. While logged in, click "Logout" in the navbar
2. Verify:
   - Redirected to login page
   - Authentication state cleared
   - Cannot access protected routes

#### Protected Routes Test
1. While logged out, try to visit `/dashboard`
2. Verify automatic redirect to login page
3. After login, verify redirect back to intended page

### 2. Automated Testing

Run the simple test suite:

```bash
# Note: This is a basic test suite. For full testing, consider adding Jest/Vitest
node src/tests/auth.test.js
```

### 3. Interactive Examples

Visit these pages to explore the authentication system:

- **Login Form Demo:** `/examples/login-form`
- **Auth System Demo:** `/examples/auth`

## 📚 Usage Examples

### Basic LoginForm Usage

```jsx
import LoginForm from './components/LoginForm';
import useAuth from './hooks/useAuth';
import authService from './services/authService';

function LoginPage() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await authService.login(
        formData.email, 
        formData.password
      );
      login(response.access_token, response.user_id);
      // Navigate to dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <LoginForm 
        onSubmit={handleLogin}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
```

### Authentication Hook Usage

```jsx
import useAuth from './hooks/useAuth';

function ProtectedComponent() {
  const { 
    isAuthenticated, 
    user_id, 
    access_token, 
    logout,
    isLoading 
  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome, User {user_id}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### API Integration Example

```jsx
import authService from './services/authService';
import useAuth from './hooks/useAuth';

function ApiComponent() {
  const { getAuthHeader } = useAuth();

  const makeAuthenticatedRequest = async () => {
    const response = await fetch('/api/protected-endpoint', {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  };

  return (
    <button onClick={makeAuthenticatedRequest}>
      Make Authenticated Request
    </button>
  );
}
```

## 🛡️ Security Features

### Token Storage
- **Development:** Tokens stored in `localStorage`
- **Production Recommendation:** Use httpOnly cookies for enhanced security

### State Management
- Authentication state managed via React Context
- Automatic state restoration on page refresh
- Secure token handling with error boundaries

### Protected Routes
- Automatic redirect to login for unauthenticated users
- Preservation of intended destination after login
- Loading states during authentication checks

## 🔌 Backend Integration

### API Endpoints

The frontend integrates with these backend endpoints:

- **POST** `/api/v1/auth/login`
  - Body: `{ email: string, password: string }`
  - Returns: `{ access_token: string, user_id: string }`

### Error Handling

The system handles various error scenarios:

- **400 Bad Request:** Invalid input validation
- **401 Unauthorized:** Invalid credentials
- **500 Server Error:** Backend server issues
- **Network Errors:** Connection timeouts, DNS issues

### Response Format

Expected successful login response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user_id": "user-uuid-here"
}
```

## 🧭 Navigation and Routing

### Public Routes
- `/` - Home page
- `/login` - Login page (redirects if authenticated)
- `/examples/*` - Example pages

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)

### Route Protection
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 🐛 Troubleshooting

### Common Issues

1. **Login button disabled**
   - Check that both email and password fields are filled
   - Ensure email format is valid
   - Verify no validation errors are present

2. **Network errors**
   - Check backend server status
   - Verify VITE_API_URL environment variable
   - Check browser console for CORS issues

3. **Authentication state not persisting**
   - Check localStorage for stored tokens
   - Verify AuthProvider wraps the entire app
   - Check for JavaScript errors in console

4. **Redirects not working**
   - Ensure React Router is properly configured
   - Check ProtectedRoute implementation
   - Verify navigation logic in auth hooks

### Debug Information

Enable debug logging by checking the browser console. The authentication system logs:
- API requests and responses
- Authentication state changes
- Error details and stack traces
- Token storage operations

## 📈 Performance Considerations

- Authentication state loads asynchronously to prevent blocking
- Tokens are cached in memory after localStorage retrieval
- Minimal re-renders through optimized context structure
- Lazy loading of authentication-dependent components

## 🔄 Future Enhancements

Potential improvements for production:

1. **Enhanced Security**
   - HttpOnly cookie implementation
   - Token refresh mechanism
   - CSRF protection

2. **User Experience**
   - Remember me functionality
   - Social login integration
   - Password reset flow

3. **Developer Experience**
   - Comprehensive test suite with Jest/Vitest
   - Storybook components
   - TypeScript migration

## 📞 Support

For questions or issues with the authentication system:

1. Check this documentation first
2. Review the example implementations
3. Check browser console for errors
4. Test with the provided demo credentials
5. Verify backend connectivity and status