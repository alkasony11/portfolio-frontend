import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";
// import project1 from "../assets/project1.jpg";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.PROJECTS);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section has-background-white py-6" style={{ minHeight: '100vh' }}>
      <div className="container">
        <h2 className="title is-2 has-text-black has-text-centered mb-6">Projects</h2>
        {projects.length === 0 && (
          <div className="has-text-centered">
            <p className="has-text-grey is-size-5">No projects available yet.</p>
            <p className="has-text-grey is-size-6 mt-2">Add your projects through the admin panel.</p>
          </div>
        )}

        <div className="columns is-multiline is-centered">
          {projects.map((project) => (
            <div key={project._id} className="column is-4">
              <div className="box has-background-white" 
                style={{ 
                  border: '2px solid black',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
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
                      <span className="icon">
                        <i className="fab fa-github"></i>
                      </span>
                      <span>GitHub</span>
                    </a>
                    <a href={project.liveLink} className="button is-black" style={{ borderRadius: '20px' }}>
                      <span className="icon">
                        <i className="fas fa-external-link-alt"></i>
                      </span>
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
