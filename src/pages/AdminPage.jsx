import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { resources as initialResources } from '../data/resources';

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resources, setResources] = useState(initialResources);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'article',
    url: '',
  });

  // Protect admin page - only admins can access
  if (!user) {
    return (
      <div className="admin-page content-container">
        <h1>Admin Dashboard</h1>
        <p>Please <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>login</a> to access the admin dashboard.</p>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="admin-page content-container">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const handleAddResource = (e) => {
    e.preventDefault();
    const newResourceWithId = {
      ...newResource,
      id: resources.length + 1,
      tags: [],
      isHelpful: false,
    };
    setResources([...resources, newResourceWithId]);
    setNewResource({ title: '', description: '', type: 'article', url: '' });
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  return (
    <div className="admin-page content-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-section">
        <h2>Manage Resources</h2>
        <form onSubmit={handleAddResource}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={newResource.title}
              onChange={(e) =>
                setNewResource({ ...newResource, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Description"
              value={newResource.description}
              onChange={(e) =>
                setNewResource({ ...newResource, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="URL"
              value={newResource.url}
              onChange={(e) =>
                setNewResource({ ...newResource, url: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Add Resource</button>
        </form>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td>{resource.title}</td>
                <td>{resource.description}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDeleteResource(resource.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
