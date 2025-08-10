import React, { useState, useEffect } from "react";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    linkedin: ''
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/contact');
        const data = await response.json();
        setContactInfo(data);
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
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="column is-half">
                  <div className="is-flex is-align-items-center is-justify-content-center">
                    <span className="icon is-large mr-2">
                      <i className="fab fa-linkedin fa-2x" style={{ color: 'black' }}></i>
                    </span>
                    <div>
                      <a href={contactInfo.linkedin} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="title is-6 has-text-black">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
