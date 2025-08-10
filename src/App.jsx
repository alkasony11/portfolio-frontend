import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddHome from "./Pages/Admin/AddHome";
import AddAbout from "./Pages/Admin/AddAbout";
import AddCertificate from "./Pages/Admin/AddCertificate";
import AddProject from "./Pages/Admin/AddProject";
import AddContact from "./Pages/Admin/AddContact";
import Admin from "./Pages/Admin/Admin";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import './assets/bulma.min.css';
import './index.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/admin/addhome" element={
            <ProtectedRoute>
              <AddHome />
            </ProtectedRoute>
          } />
          <Route path="/admin/addabout" element={
            <ProtectedRoute>
              <AddAbout />
            </ProtectedRoute>
          } />
          <Route path="/admin/addcertificates" element={
            <ProtectedRoute>
              <AddCertificate />
            </ProtectedRoute>
          } />
          <Route path="/admin/addprojects" element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          } />
          <Route path="/admin/addcontact" element={
            <ProtectedRoute>
              <AddContact />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
