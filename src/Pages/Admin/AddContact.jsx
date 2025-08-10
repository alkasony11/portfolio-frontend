import React, { useState, useEffect } from "react";
import AdminHeader from '../../Components/AdminHeader';
import { API_ENDPOINTS } from '../../config/api';

const AddContact = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    socialMedia: [{ platform: "", url: "" }]
  });

  // Fetch existing contact data when component loads
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CONTACT);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFormData({
              email: data.email || "",
              phone: data.phone || "",
              socialMedia: data.socialMedia?.length ? data.socialMedia : [{ platform: "", url: "" }]
            });
          }
        }
      } catch (err) {
        console.error("Error fetching contact data:", err);
      }
    };

    fetchContactData();
  }, []);

  const handleSocialMediaChange = (index, field, value) => {
    const newSocialMedia = [...formData.socialMedia];
    newSocialMedia[index][field] = value;
    setFormData({ ...formData, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    setFormData({
      ...formData,
      socialMedia: [...formData.socialMedia, { platform: "", url: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Contact information added successfully!');
        setFormData({
          email: "",
          phone: "",
          socialMedia: [{ platform: "", url: "" }]
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <section className="section is-white" style={{ marginTop: "5rem" }}>
        <div className="container">
          <h1 className="title is-2 has-text-centered mb-6">Add Contact Information</h1>
          <div className="columns is-centered">
            <div className="column is-8">
              <form onSubmit={handleSubmit}>
                <div className="box" style={{ borderRadius: '8px', border: '2px solid black' }}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Phone</label>
                    <div className="control">
                      <input
                        className="input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {formData.socialMedia.map((social, index) => (
                    <div key={index} className="field">
                      <label className="label">Social Media {index + 1}</label>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Platform"
                              value={social.platform}
                              onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input
                              className="input"
                              type="url"
                              placeholder="URL"
                              value={social.url}
                              onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="field">
                    <div className="control">
                      <button
                        type="button"
                        className="button is-light is-fullwidth mb-4"
                        onClick={addSocialMedia}
                      >
                        Add Another Social Media
                      </button>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button 
                        type="submit" 
                        className="button is-black is-fullwidth"
                        style={{ borderRadius: '20px', padding: '0.5rem 1.5rem' }}
                      >
                        Save Contact Information
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddContact;
