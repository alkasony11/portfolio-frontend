import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer has-background-white py-5">
      <div className="content has-text-centered">
        <p className="has-text-black is-size-6">
          &copy; {new Date().getFullYear()} Portfolio. All Rights Reserved.
        </p>
        <p className="has-text-grey is-size-7 mt-2">
          Built with React & Node.js |
          <Link
            to="/admin"
            className="has-text-grey ml-1"
            style={{
              textDecoration: 'none',
              opacity: '0.5',
              fontSize: '0.7rem'
            }}
            title="Admin Access"
          >
            ⚙️
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
