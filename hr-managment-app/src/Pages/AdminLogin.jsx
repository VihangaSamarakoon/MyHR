import React from 'react'
import Login from '../Component/Login'
import "../Component/LoginStyle.css";

function AdminLogin() {
  const userType = "Admin";
  return (
    <div>
       <Login userType={userType}/>
    </div>
  )
}

export default AdminLogin