import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin/addhome');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="box" style={{ 
        backgroundColor: '#2a2a2a',
        border: '2px solid #ffffff',
        borderRadius: '8px',
        padding: '2rem',
        width: '400px'
      }}>
        <h1 className="title is-2 has-text-centered has-text-white mb-6">
          Admin Login
        </h1>

        {error && (
          <div className="notification is-danger is-light mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label has-text-white">Username</label>
            <div className="control">
              <input
                className="input is-dark"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({
                  ...credentials,
                  username: e.target.value
                })}
                style={{
                  backgroundColor: '#3a3a3a',
                  color: 'white',
                  border: '1px solid #4a4a4a'
                }}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label has-text-white">Password</label>
            <div className="control">
              <input
                className="input is-dark"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                  ...credentials,
                  password: e.target.value
                })}
                style={{
                  backgroundColor: '#3a3a3a',
                  color: 'white',
                  border: '1px solid #4a4a4a'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="button is-white is-fullwidth mt-5"
            style={{ borderRadius: '20px' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;