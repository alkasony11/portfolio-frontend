import React, { useState, useEffect } from "react";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio/certificates");
        if (!response.ok) {
          throw new Error("Failed to fetch certificates");
        }
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="section has-background-white py-6" style={{ minHeight: "100vh" }}>
      <div className="container">
        <h2 className="title is-2 has-text-black has-text-centered mb-6">Certificates</h2>

        {loading && <p className="has-text-centered">Loading certificates...</p>}
        {error && <p className="has-text-danger has-text-centered">Error: {error}</p>}

        {!loading && !error && certificates.length === 0 && (
          <p className="has-text-centered">No certificates available.</p>
        )}

        <div className="columns is-multiline is-centered">
          {certificates.map((certificate) => (
            <div key={certificate._id} className="column is-4">
              <div className="box has-background-white" style={{ border: "2px solid black", borderRadius: "8px", textAlign: "center" }}>
                <div className="card-image">
                  <figure className="image">
                    <img src={`http://localhost:5000/${certificate.image?.replace(/\\/g, '/')}`} alt={certificate.name} style={{ maxWidth: "100%", height: "auto" }} />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="title is-4 has-text-black mb-4">{certificate.name}</p>
                  <a href={certificate.credentialUrl} className="button is-black" style={{ borderRadius: "20px" }} target="_blank" rel="noopener noreferrer">
                    View Credential
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
