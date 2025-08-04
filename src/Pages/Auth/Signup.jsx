import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validationRules = {
    name: (value) => /^[A-Za-z]+(\s[A-Za-z]+)+$/.test(value) ? '' : 'Name must be at least two words',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid Email Address',
    password: (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value) ? '' : 'Password must be at least 8 characters with uppercase, number, and symbol',
    rePassword: (value) => value === formData.password ? '' : 'Passwords do not match',
    phone: (value) => /^01[0125][0-9]{8}$/.test(value) ? '' : 'Phone must be 11 digits starting with 01',
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate While Typing 
    const fieldName = e.target.name;
    const error = validationRules[fieldName](e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validationRules[name](value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const newErrors = {};
    for (const field in formData) {
      const error = validationRules[field](formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.email === formData.email);

    if (userExists) {
      setErrors({ email: 'Account with this email already exists!' });
      return;
    }

    const updatedUsers = [...existingUsers, { email: formData.email, password: formData.password }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setSuccessMessage('Account created successfully! Redirecting to Login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold fst-italic" style={{ color: '#651214ff' }}>Sign Up</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '50%' }}>
        {['name', 'email', 'password', 'rePassword', 'phone'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label fw-bold" htmlFor={field}>
              {field === 'rePassword' ? 'Re-Enter Password' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
              required
            />
            {errors[field] && (
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors[field]}
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: '#651214ff', color: 'white' }}>
          Signup
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
