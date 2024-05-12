import React from 'react'
import Login from '../Component/Login'
import "../Component/LoginStyle.css";

function EmpLogin() {
  const userType = "Emp";
  return (
    <div>
        <Login userType={userType}/>
    </div>
  )
}

export default EmpLogin