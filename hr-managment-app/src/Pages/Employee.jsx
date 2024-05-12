import React, { useEffect } from 'react'
import NavBar from '../Component/NavBar'
import TitleBar from '../Component/TitleBar'
import EmployeeCenterCard from '../Component/EmployeeCenterCard'
import { useNavigate } from "react-router-dom";
function Employee() {

  const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionStorage.getItem("AloginStatus") !== "true") {
      navigate("/adminlogin");
    }
  }, [navigate]);

  return (
    <div className="content">
      <div className="container">
      <div className="col-l">
        <NavBar/>
      </div>

      <div className="col-r">
        <TitleBar />
        <EmployeeCenterCard/>
      </div>
    </div>
    </div>
  )
}

export default Employee