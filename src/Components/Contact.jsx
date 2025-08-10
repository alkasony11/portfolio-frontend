import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    socialMedia: []
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CONTACT);
        const data = await response.json();
        if (data) {
          setContactInfo(data);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <section id="contact" className="section has-background-white py-6" style={{ minHeight: '70vh' }}>
      <div className="container">
        <h2 className="title is-2 has-text-black has-text-centered mb-6">Contact Me</h2>
        <div className="columns is-centered">
          <div className="column is-8">
            <div className="box has-background-white" 
              style={{ 
                border: '2px solid black',
                borderRadius: '40px',
                textAlign: 'center'
              }}>
              <div className="columns is-centered is-mobile">
                <div className="column is-half">
                  <div className="is-flex is-align-items-center is-justify-content-center">
                    <span className="icon is-large mr-2">
                      <i className="fas fa-envelope fa-2x" style={{ color: 'black' }}></i>
                    </span>
                    <div>
                      <a href={`mailto:${contactInfo.email}`} className="title is-6 has-text-black">
                        {contactInfo.email || 'Email not provided'}
                      </a>
                    </div>
                  </div>
                </div>

                {contactInfo.phone && (
                  <div className="column is-half">
                    <div className="is-flex is-align-items-center is-justify-content-center">
                      <span className="icon is-large mr-2">
                        <i className="fas fa-phone fa-2x" style={{ color: 'black' }}></i>
                      </span>
                      <div>
                        <a href={`tel:${contactInfo.phone}`} className="title is-6 has-text-black">
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {contactInfo.socialMedia && contactInfo.socialMedia.length > 0 && (
                <div className="columns is-centered mt-4">
                  <div className="column is-8">
                    <div className="is-flex is-justify-content-center is-flex-wrap-wrap">
                      {contactInfo.socialMedia.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button is-black mr-3 mb-3"
                          style={{ borderRadius: '20px' }}
                        >
                          <span className="icon">
                            <i className={`fab fa-${social.platform.toLowerCase()}`}></i>
                          </span>
                          <span>{social.platform}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
