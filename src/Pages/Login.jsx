import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(responseData.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check if the server is running.');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="box" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '20px',
              padding: '3rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <div className="has-text-centered mb-6">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-user-shield fa-2x" style={{ color: 'white' }}></i>
                </div>
                <h1 className="title is-2 has-text-black" style={{ marginBottom: '0.5rem' }}>
                  Admin Portal
                </h1>
                <p className="subtitle is-5 has-text-grey">
                  Secure access to portfolio management
                </p>
              </div>

              {error && (
                <div className="notification is-danger is-light mb-4">
                  <button className="delete" onClick={() => setError('')}></button>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label has-text-black" style={{ fontWeight: '600' }}>Username</label>
                  <div className="control has-icons-left">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({
                        ...credentials,
                        username: e.target.value
                      })}
                      style={{
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      required
                    />
                    <span className="icon is-small is-left" style={{ color: '#667eea' }}>
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label has-text-black" style={{ fontWeight: '600' }}>Password</label>
                  <div className="control has-icons-left">
                    <input
                      className="input is-medium"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value
                      })}
                      style={{
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      required
                    />
                    <span className="icon is-small is-left" style={{ color: '#667eea' }}>
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div className="field mt-5">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-fullwidth is-medium"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: '600',
                        padding: '0.75rem 1.5rem',
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sign-in-alt"></i>
                      </span>
                      <span>Access Dashboard</span>
                    </button>
                  </div>
                </div>
              </form>

              <div className="has-text-centered mt-5">
                <div style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}>
                  <p className="is-size-6 has-text-white" style={{ fontWeight: '600' }}>
                    🔐 Demo Access
                  </p>
                  <p className="is-size-7 has-text-white">
                    Username: <strong>admin</strong> | Password: <strong>admin123</strong>
                  </p>
                </div>
                <p className="is-size-7 has-text-grey">
                  This is a secure admin area. Only authorized users can access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;