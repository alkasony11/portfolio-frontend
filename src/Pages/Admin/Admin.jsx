import React from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AddHome from './AddHome'
import AddAbout from './AddAbout'
import AddCertificate from './AddCertificate'
import AddProject from './AddProject'
import AddContact from './AddContact'

function Admin() {
  return (
    <div>
        <AdminHeader/>
        <AddHome/>
        <AddAbout/>
        <AddCertificate/>
        <AddProject/>
        <AddContact/>
    </div>
  )
}

export default Admin