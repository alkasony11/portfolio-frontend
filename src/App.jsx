import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddHome from "./Pages/Admin/AddHome";
import AddAbout from "./Pages/Admin/AddAbout";
import AddCertificate from "./Pages/Admin/AddCertificate";
import AddProject from "./Pages/Admin/AddProject";
import AddContact from "./Pages/Admin/AddContact";
import Login from "./Pages/Login";
import './assets/bulma.min.css';
import './index.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/addhome" element={<AddHome />} />
          <Route path="/admin/addabout" element={<AddAbout />} />
          <Route path="/admin/addcertificates" element={<AddCertificate />} />
          <Route path="/admin/addprojects" element={<AddProject />} />
          <Route path="/admin/addcontact" element={<AddContact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
