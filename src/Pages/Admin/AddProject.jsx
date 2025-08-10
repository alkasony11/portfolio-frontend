import React, { useState, useEffect } from "react";
import AdminHeader from '../../Components/AdminHeader';
import { API_ENDPOINTS } from '../../config/api';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    githubLink: "",
    liveLink: ""
  });
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PROJECTS);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.description || (!editingId && !formData.image)) {
      alert("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("githubLink", formData.githubLink);
    formDataToSend.append("liveLink", formData.liveLink);

    // Only append image if a new file is selected
    if (formData.image && typeof formData.image !== "string") {
      formDataToSend.append("image", formData.image);
    }

    try {
      const url = editingId
        ? `${API_ENDPOINTS.PROJECTS}/${editingId}`
        : API_ENDPOINTS.PROJECTS;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save project");
      }

      alert(editingId ? "Project updated successfully!" : "Project added successfully!");
      setFormData({ name: "", description: "", image: null, githubLink: "", liveLink: "" });
      setEditingId(null);
      setImagePreview(null);
      fetchProjects();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      description: project.description,
      githubLink: project.githubLink,
      liveLink: project.liveLink,
      image: null,
    });
    setImagePreview(`${API_ENDPOINTS.BASE}/${project.image?.replace(/\\/g, '/')}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${API_ENDPOINTS.PROJECTS}/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Project deleted successfully!');
          fetchProjects();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <AdminHeader />
      <section className="section" style={{ marginTop: "5rem", backgroundColor: '#1a1a1a' }}>
        <div className="container">
          <h1 className="title is-2 has-text-centered has-text-white mb-6">
            {editingId ? 'Edit Project' : 'Add Project'}
          </h1>
          
          {/* Form Section */}
          <div className="columns is-centered">
            <div className="column is-8">
              <form onSubmit={handleSubmit}>
                <div className="box" style={{ 
                  borderRadius: '8px', 
                  border: '2px solid #ffffff',
                  backgroundColor: '#2a2a2a',
                  color: 'white'
                }}>
                  <div className="field">
                    <label className="label">Project Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Project Image</label>
                    <div className="control">
                      <input
                        className="input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingId} // Only required when adding
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">GitHub Link</label>
                    <div className="control">
                      <input
                        className="input"
                        type="url"
                        value={formData.githubLink}
                        onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Live Link</label>
                    <div className="control">
                      <input
                        className="input"
                        type="url"
                        value={formData.liveLink}
                        onChange={(e) => setFormData({...formData, liveLink: e.target.value})}
                      />
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="field">
                      <p>Preview:</p>
                      <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />
                    </div>
                  )}

                  <div className="field">
                    <div className="control">
                      <button 
                        type="submit" 
                        className="button is-white is-fullwidth"
                        style={{ borderRadius: '20px', padding: '0.5rem 1.5rem' }}
                      >
                        {editingId ? 'Update Project' : 'Add Project'}
                      </button>
                    </div>
                  </div>

                  {editingId && (
                    <div className="field mt-3">
                      <div className="control">
                        <button 
                          type="button" 
                          className="button is-light is-fullwidth"
                          style={{ borderRadius: '20px', padding: '0.5rem 1.5rem' }}
                          onClick={() => {
                            setEditingId(null);
                            setFormData({ name: "", description: "", image: null, githubLink: "", liveLink: "" });
                            setImagePreview(null);
                          }}
                        >
                          Cancel Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Projects List Section */}
          <div className="columns is-centered mt-6">
            <div className="column is-8">
              <h2 className="title is-3 has-text-white mb-4">Existing Projects</h2>
              <div className="projects-grid">
                {projects.map((project) => (
                  <div key={project._id} className="column is-4">
                    <div className="box has-background-white" style={{ border: '2px solid black', borderRadius: '8px', textAlign: 'center' }}>
                      <div className="card-image">
                        <figure className="image is-16by9">
                          <img src={`${API_ENDPOINTS.BASE}/${project.image?.replace(/\\/g, '/')}`} alt={project.name} />
                        </figure>
                      </div>
                      <div className="card-content">
                        <p className="title is-4 has-text-black mb-4">{project.name}</p>
                        <p className="subtitle is-6 has-text-grey mb-4">{project.description}</p>
                        <div className="buttons is-centered">
                          <a href={project.githubLink} className="button is-black" style={{ borderRadius: '20px' }}>
                            <span className="icon"><i className="fab fa-github"></i></span>
                            <span>GitHub</span>
                          </a>
                          <a href={project.liveLink} className="button is-black" style={{ borderRadius: '20px' }}>
                            <span className="icon"><i className="fas fa-external-link-alt"></i></span>
                            <span>Live Demo</span>
                          </a>
                        </div>
                      </div>
                      <div className="buttons">
                        <button 
                          className="button is-info is-small"
                          onClick={() => handleEdit(project)}
                        >
                          Edit
                        </button>
                        <button 
                          className="button is-danger is-small"
                          onClick={() => handleDelete(project._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProject;