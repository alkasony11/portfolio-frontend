// API Configuration
const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  PORTFOLIO: `${API_BASE_URL}/api/portfolio`,
  AUTH: `${API_BASE_URL}/api/portfolio`, // Note: login endpoint is actually under portfolio
  
  // Portfolio endpoints
  HOME: `${API_BASE_URL}/api/portfolio/home`,
  ABOUT: `${API_BASE_URL}/api/portfolio/about`,
  CERTIFICATES: `${API_BASE_URL}/api/portfolio/certificates`,
  PROJECTS: `${API_BASE_URL}/api/portfolio/projects`,
  CONTACT: `${API_BASE_URL}/api/portfolio/contact`,
  LOGIN: `${API_BASE_URL}/api/portfolio/login`,
  
  // File uploads
  UPLOADS: `${API_BASE_URL}/uploads`
};

export default API_ENDPOINTS;
