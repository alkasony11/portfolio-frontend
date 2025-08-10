import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from '../../Components/AdminHeader';

const AddAbout = () => {
  const [formData, setFormData] = useState({
    education: [{ degree: "", institution: "", year: "" }],
    skills: [],
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing About data when component loads
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/portfolio/about");
        if (response.data) {
          setFormData(response.data);
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };

    fetchAboutData();
  }, []);

  // Handle changes in the education fields
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  // Add new education field
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", institution: "", year: "" }]
    });
  };

  // Handle skills input
  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map(skill => skill.trim())
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const aboutData = {
        description: formData.description,
        education: formData.education,
        skills: formData.skills
      };

      await axios.post('http://localhost:5000/api/portfolio/about', aboutData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      alert('About section updated successfully!');

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update about section');
      alert('Error updating about section: ' + error.message);
    } finally {
      setLoading(false);
    }
};


  return (
    <div>
      <AdminHeader />
      <section className="section is-white" style={{ marginTop: "5rem" }}>
        <div className="container">
          <h1 className="title is-2 has-text-centered mb-6">Edit About Section</h1>
          {error && <div className="notification is-danger">{error}</div>}
          <div className="columns is-centered">
            <div className="column is-8">
              <form onSubmit={handleSubmit}>
                <div className="box" style={{ borderRadius: '8px', border: '2px solid black' }}>
                  
                  {/* Education Fields */}
                  {formData.education.map((edu, index) => (
                    <div key={index} className="field">
                      <label className="label">Education {index + 1}</label>
                      <div className="field-body">
                        <div className="field">
                          <input
                            className="input"
                            type="text"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            required
                          />
                        </div>
                        <div className="field">
                          <input
                            className="input"
                            type="text"
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                            required
                          />
                        </div>
                        <div className="field">
                          <input
                            className="input"
                            type="text"
                            placeholder="Year"
                            value={edu.year}
                            onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="field">
                    <button type="button" className="button is-light is-fullwidth mb-4" onClick={addEducation}>
                      Add Another Education
                    </button>
                  </div>

                  {/* Skills Input */}
                  <div className="field">
                    <label className="label">Skills (comma-separated)</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={formData.skills.join(", ")}
                        onChange={handleSkillsChange}
                        placeholder="JavaScript, React, Node.js, etc."
                        required
                      />
                    </div>
                  </div>

                  {/* Description Input */}
                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className={`button is-black is-fullwidth ${loading ? "is-loading" : ""}`}
                        style={{ borderRadius: "20px", padding: "0.5rem 1.5rem" }}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Update About Section"}
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

export default AddAbout;
