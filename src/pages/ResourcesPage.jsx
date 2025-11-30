import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { resources as initialResources } from '../data/resources';

const ResourcesPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resources, setResources] = useState(initialResources);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="resources-page content-container">
        <h1>Self-Help Resources</h1>
        <p>Please <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>login</a> to access self-help resources.</p>
      </div>
    );
  }

  useEffect(() => {
    const filteredResources = initialResources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResources(filteredResources);
  }, [searchTerm]);

  const toggleHelpful = (id) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? { ...resource, isHelpful: !resource.isHelpful }
          : resource
      )
    );
  };

  return (
    <div className="resources-page content-container">
      <h1>Self-Help Resources</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="resources-list">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-item">
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              View Resource
            </a>
            <button onClick={() => toggleHelpful(resource.id)}>
              {resource.isHelpful ? 'Unmark as helpful' : 'Mark as helpful'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
