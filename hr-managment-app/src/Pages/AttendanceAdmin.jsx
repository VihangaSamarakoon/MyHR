import React, { useEffect } from 'react'
import NavBar from '../Component/NavBar'
import TitleBar from '../Component/TitleBar'
import AttendanceCenter from '../Component/AttendanceAdminCenter'
import { useNavigate } from "react-router-dom";
function AttendanceAdmin() {

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
        <AttendanceCenter/>
      </div>
    </div>
    </div>
  )
}

export default AttendanceAdmin