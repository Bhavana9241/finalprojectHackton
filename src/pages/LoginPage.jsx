import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = storedUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Check if admin (you can set admin email here)
      const isAdmin = email === 'admin@mental-health.com';
      const userData = { 
        email: user.email, 
        name: user.name,
        isAdmin: isAdmin
      };
      login(userData);
      navigate('/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page content-container">
      <h1>Login</h1>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Sign up here</a>
      </p>
    </div>
  );
};

export default LoginPage;
