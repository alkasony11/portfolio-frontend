import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

const About = () => {
  const [aboutData, setAboutData] = useState({
    education: [],
    skills: [],
    description: ""
  });

  useEffect(() => {
    // Fetch about data from your backend
    const fetchAboutData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ABOUT);
        const data = await response.json();
        if (data) {
          setAboutData(data);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section id="about" className="section has-background-white py-6" style={{ minHeight: '100vh' }}>
      <div className="container">
        <h2 className="title is-2 has-text-black has-text-centered mb-6">About Me</h2>
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="box has-background-white"
              style={{
                border: '2px solid black',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
              <div className="mb-3">
                <i className="fas fa-graduation-cap fa-2x" style={{ color: 'black' }}></i>
              </div>
              <h3 className="title is-4 has-text-black mb-4">Education</h3>
              {aboutData.education && aboutData.education.length > 0 ? (
                aboutData.education.map((edu, index) => (
                  <p key={index} className="has-text-black is-size-5">
                    {edu.degree} - {edu.institution} ({edu.year})
                  </p>
                ))
              ) : (
                <p className="has-text-grey is-size-6">No education data available</p>
              )}
            </div>
          </div>
          <div className="column is-4">
            <div className="box has-background-white"
              style={{
                border: '2px solid black',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
              <div className="mb-3">
                <i className="fas fa-code fa-2x" style={{ color: 'black' }}></i>
              </div>
              <h3 className="title is-4 has-text-black mb-4">Skills</h3>
              <div className="tags is-centered">
                {aboutData.skills && aboutData.skills.length > 0 ? (
                  aboutData.skills.map((skill, index) => (
                    <span key={index} className="tag is-medium is-dark">{skill}</span>
                  ))
                ) : (
                  <span className="tag is-medium is-light">No skills data available</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="columns is-centered mt-4">
          <div className="column is-8">
            <div className="content has-text-black is-size-5 has-text-centered">
              <p>{aboutData.description || 'No description available. Please add your information through the admin panel.'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
