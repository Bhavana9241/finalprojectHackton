import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ResourcesPage from './pages/ResourcesPage';
import SessionsPage from './pages/SessionsPage';
import ForumPage from './pages/ForumPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
