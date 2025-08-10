import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <span 
              className="has-text-black is-size-4 has-text-weight-bold">
              PORTFOLIO
            </span>
          </div>
        </div>
        <div className="navbar-menu" style={{paddingTop: '2.5em' }}>
          <div className="navbar-end">
            {["Home", "About", "Certificates", "Projects", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="navbar-item has-text-black is-size-5"
                onClick={(e) => {
                  if (item === 'Home') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {item}
              </a>
            ))}
            <Link
              to="/admin"
              className="navbar-item has-text-grey is-size-6"
              style={{
                fontWeight: '500',
                opacity: '0.7',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              title="Admin Access"
            >
              <span className="icon is-small">
                <i className="fas fa-cog"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
