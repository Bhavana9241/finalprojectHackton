import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Mental Health Platform</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/sessions">Sessions</Link>
          </li>
          <li>
            <Link to="/forum">Forum</Link>
          </li>
          {user ? (
            <>
              {user.isAdmin && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <span style={{ color: '#004d40', fontWeight: '600' }}>Welcome, {user.name}</span>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
