import React from "react";

const Footer = () => {
  return (
    <footer className="footer has-background-white py-5">
      <div className="content has-text-centered">
        <p className="has-text-black is-size-6">Copyright
          &copy; {new Date().getFullYear()} Alka Sony. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
