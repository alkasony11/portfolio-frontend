import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from '../../Components/AdminHeader';

const AddHome = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    profileImage: null,
    socialLinks: [{ platform: "", url: "" }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing data
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio/home', { withCredentials: true });
        console.log("API Response:", response.data);
        if (response.data) {
          const { name, title, profileImage, socialLinks } = response.data;
          setFormData({
            name: name || "",
            title: title || "",
            profileImage: profileImage || null,
            socialLinks: socialLinks?.length ? socialLinks : [{ platform: "", url: "" }]
          });
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  const handleSocialLinkChange = (index, field, value) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index][field] = value;
    setFormData({ ...formData, socialLinks: newSocialLinks });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: "", url: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const homeData = {
        name: formData.name,
        title: formData.title,
        profileImage: formData.profileImage,
        socialLinks: formData.socialLinks
      };

      const formDataToSend = new FormData();
      formDataToSend.append('name', homeData.name);
      formDataToSend.append('title', homeData.title);
      if (homeData.profileImage) {
        formDataToSend.append('profileImage', homeData.profileImage);
      }
      formDataToSend.append('socialLinks', JSON.stringify(homeData.socialLinks));

      await axios.post('http://localhost:5000/api/portfolio/home', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      alert('Home section saved successfully!');

   
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save data');
      alert('Error saving home section: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader />
      <section className="section is-white" style={{ marginTop: "5rem" }}>
        <div className="container">
          <h1 className="title is-2 has-text-centered mb-6">Add Home Section</h1>
          {error && <div className="notification is-danger">{error}</div>}
          <div className="columns is-centered">
            <div className="column is-8">
              <form onSubmit={handleSubmit}>
                <div className="box" style={{ borderRadius: '8px', border: '2px solid black' }}>
                  <div className="field">
                    <label className="label">Name*</label>
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
                    <label className="label">Title*</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Profile Image*</label>
                    <div className="control">
                      <input
                        className="input"
                        type="file"
                        onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
                        accept="image/*"
                      />
                    </div>
                    {formData.profileImage && (
                      <p>Current Image:{formData.profileImage.name}</p>
                    )}
                  </div>

                  {formData.socialLinks.map((link, index) => (
                    <div key={index} className="field">
                      <label className="label">Social Link {index + 1}</label>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Platform (e.g., GitHub)"
                              value={link.platform}
                              onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input
                              className="input"
                              type="url"
                              placeholder="URL"
                              value={link.url}
                              onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                              required
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
                        onClick={addSocialLink}
                      >
                        Add Another Social Link
                      </button>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className={`button is-black is-fullwidth ${loading ? 'is-loading' : ''}`}
                        style={{ borderRadius: '20px', padding: '0.5rem 1.5rem' }}
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Home Section'}
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

export default AddHome;
