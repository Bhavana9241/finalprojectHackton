import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    
    // Get existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if email already exists
    if (storedUsers.find(u => u.email === email)) {
      setError('Email already registered. Please login instead.');
      return;
    }
    
    // Add new user
    const newUser = { name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
    
    // Auto-login after signup
    const userData = { 
      email: newUser.email, 
      name: newUser.name,
      isAdmin: false
    };
    login(userData);
    navigate('/');
  };

  return (
    <div className="signup-page content-container">
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login here</a>
      </p>
    </div>
  );
};

export default SignupPage;
