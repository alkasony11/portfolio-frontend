import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from '../../Components/AdminHeader';

const AddCertificate = () => {
  const [formData, setFormData] = useState({
    name: "",
    credentialUrl: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/portfolio/certificates');
      if (response.data) {
        setCertificates(response.data);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setError("Failed to fetch certificates");
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
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("credentialUrl", formData.credentialUrl);

      // Only append image if a new file is selected
      if (formData.image && typeof formData.image !== "string") {
        formDataToSend.append("image", formData.image);
      }

      // Check if all required fields are filled
      if (!formData.name || !formData.credentialUrl || (!editingId && !formData.image)) {
        alert("Please fill in all fields.");
        setLoading(false);
        return;
      }

      if (editingId) {
        // Update existing certificate
        await axios.put(`http://localhost:5000/api/portfolio/certificates/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Certificate updated successfully!");
      } else {
        // Add new certificate
        await axios.post("http://localhost:5000/api/portfolio/certificates", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Certificate added successfully!");
      }

      fetchCertificates(); // Re-fetch certificates to update the list
      setFormData({ name: "", credentialUrl: "", image: null });
      setImagePreview(null);
      setEditingId(null);
    } catch (error) {
      console.error("Error details:", error.response?.data); // Log the full error response
      alert("Error saving certificate: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate._id);
    setFormData({
      name: certificate.name,
      credentialUrl: certificate.credentialUrl,
      image: null,
    });
    setImagePreview(`http://localhost:5000/${certificate.image?.replace(/\\/g, '/')}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        await axios.delete(`http://localhost:5000/api/portfolio/certificates/${id}`);
        alert("Certificate deleted successfully!");
        fetchCertificates(); // Re-fetch certificates after deletion
      } catch (error) {
        alert("Error deleting certificate: " + error.message);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <AdminHeader />
      <section className="section" style={{ marginTop: "5rem", backgroundColor: '#1a1a1a' }}>
        <div className="container">
          <h1 className="title is-2 has-text-centered has-text-white mb-6">
            {editingId ? 'Edit Certificate' : 'Add Certificate'}
          </h1>
          
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
                    <label className="label">Certificate Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Credential URL</label>
                    <div className="control">
                      <input
                        className="input"
                        type="url"
                        value={formData.credentialUrl}
                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Certificate Image</label>
                    <div className="control">
                      <input
                        className="input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingId}
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
                      <button type="submit" className="button is-white is-fullwidth">
                        {editingId ? "Update Certificate" : "Add Certificate"}
                      </button>
                    </div>
                  </div>

                  {editingId && (
                    <div className="field mt-3">
                      <div className="control">
                        <button 
                          type="button" 
                          className="button is-light is-fullwidth"
                          onClick={() => {
                            setEditingId(null);
                            setFormData({ name: "", credentialUrl: "", image: null });
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

          {/* Certificates List Section */}
          <div className="columns is-centered mt-6">
            <div className="column is-8">
              <h2 className="title is-3 has-text-white mb-4">Existing Certificates</h2>
              <div className="certificates-grid">
                {certificates.map(certificate => (
                  <div key={certificate._id} className="box" style={{ 
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #ffffff',
                    marginBottom: '1rem'
                  }}>
                    <div className="columns is-vcentered">
                      <div className="column is-3">
                        <figure className="image is-square">
                          <img 
                            src={`http://localhost:5000/${certificate.image?.replace(/\\/g, '/')}`} 
                            alt={certificate.name}
                            style={{ objectFit: 'cover' }}
                          />
                        </figure>
                      </div>
                      <div className="column">
                        <h3 className="title is-4 has-text-white">{certificate.name}</h3>
                        <a href={certificate.credentialUrl} 
                           className="has-text-info" 
                           target="_blank" 
                           rel="noopener noreferrer">
                          View Credential
                        </a>
                      </div>
                      <div className="column is-2">
                        <div className="buttons">
                          <button 
                            className="button is-info is-small"
                            onClick={() => handleEdit(certificate)}
                          >
                            Edit
                          </button>
                          <button 
                            className="button is-danger is-small"
                            onClick={() => handleDelete(certificate._id)}
                          >
                            Delete
                          </button>
                        </div>
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

export default AddCertificate;
