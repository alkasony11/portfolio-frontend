import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    // Call your logout API endpoint if needed
    fetch(`${API_ENDPOINTS.BASE}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    }).finally(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <span className="has-text-white is-size-4 has-text-weight-bold">
              ADMIN DASHBOARD
            </span>
          </div>
        </div>
        <div className="navbar-menu" style={{paddingTop: '2.5em' }}>
          <div className="navbar-end">
            {[
              { name: "Home", path: "/admin/addhome" },
              { name: "About", path: "/admin/addabout" },
              { name: "Certificates", path: "/admin/addcertificates" },
              { name: "Projects", path: "/admin/addprojects" },
              { name: "Contact", path: "/admin/addcontact" },
              { name: "View Portfolio", path: "/" }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="navbar-item has-text-white is-size-5"
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={handleLogout}
              className="navbar-item button is-danger ml-4"
              style={{ marginTop: '0.5rem' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader; 