import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this line
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate at the top level of the component

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to backend for login
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      // Store token and role in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store role in localStorage

      // Redirect based on the role returned by the backend
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard'); // Redirect to Admin Dashboard if admin
      } else {
        navigate('/dashboard'); // Redirect to User Dashboard if regular user
      }

      // Clear error and show success message
      setError('');
      setSuccess('Login Successful!');

    } catch (err) {
      setError('Invalid credentials or server error.');
      setSuccess('');
    }
  };

  // Register Handler
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to backend for registration
      const response = await axios.post('http://localhost:5000/auth/register', {
        username,
        email,
        password,
      });

      setSuccess('Registration successful! Please log in.');
      setUsername('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
// 