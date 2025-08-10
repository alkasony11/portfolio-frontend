import React from "react";

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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
