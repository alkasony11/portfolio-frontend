import React, { useEffect, useState } from "react";

const Hero = () => {
  const [heroData, setHeroData] = useState({
    name: "",
    title: "",
    profileImage: "",
    socialLinks: []
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/portfolio/home');
        const data = await response.json();
        if (data) {
          setHeroData(data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="hero is-fullheight is-white">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered is-centered" style={{ marginRight: '5rem' }}>
            <div className="column is-4 has-text-centered">
              <figure className="image is-180x180 is-inline-block">
                <img 
                  src={`http://localhost:5000/${heroData.profileImage?.replace(/\\/g, '/')}`} 
                  alt="Profile" 
                  style={{
                    borderRadius: '50%',
                    width: '320px',
                    height: '320px',
                    objectFit: 'cover'
                  }} 
                />
              </figure>
            </div>
            <div className="column is-5">
              <p>Heii, I'm</p>
              <h1 className="title is-1 has-text-black mb-2">{heroData.name}</h1>
              <p className="subtitle is-3 has-text-black mb-5">{heroData.title}</p>
              <div className="buttons mb-3">
                <a 
                  href="#contact" 
                  className="button is-black is-small" 
                  style={{ borderRadius: '20px', padding: '0.5rem 1.5rem' }}
                >
                  Contact Info
                </a>
              </div>
              <div className="is-flex" style={{ margin: '2rem'}}>
                {heroData.socialLinks?.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    className="mr-4" 
                    style={{ color: 'black' }} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span className="icon is-large">
                      <i className={`fab fa-${link.platform.toLowerCase()} fa-2x`}></i>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
