/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from './ui/Button.jsx';
import Input from './ui/Input.jsx';
import FormField from './ui/FormField.jsx';

/**
 * LoginForm component - handles user login with email and password validation
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.onSubmit] - Handler for form submission
 * @param {boolean} [props.isSubmitting=false] - Whether the form is currently submitting
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The LoginForm component
 */
function LoginForm({ onSubmit, isSubmitting = false, className = '' }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!emailRegex.test(value)) {
          return 'Invalid email format';
        }
        return '';
      case 'password':
        if (!value.trim()) {
          return 'Password is required';
        }
        return '';
      default:
        return '';
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle input blur (for showing validation errors)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };
    
    setErrors(newErrors);
    setTouched({
      email: true,
      password: true
    });

    return !Object.values(newErrors).some(error => error !== '');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm() && !isSubmitting) {
      onSubmit?.(formData);
    }
  };

  // Check if form is valid (no errors and all fields filled)
  const isFormValid = !Object.values(errors).some(error => error !== '') && 
                     formData.email.trim() !== '' && 
                     formData.password.trim() !== '';

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <FormField
        label="Email"
        id="email"
        required
        error={touched.email ? errors.email : ''}
      >
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !!errors.email}
          disabled={isSubmitting}
          fullWidth
        />
      </FormField>

      <FormField
        label="Password"
        id="password"
        required
        error={touched.password ? errors.password : ''}
      >
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !!errors.password}
          disabled={isSubmitting}
          fullWidth
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={!isFormValid || isSubmitting}
        loading={isSubmitting}
      >
        Login
      </Button>
    </form>
  );
}

export default LoginForm;