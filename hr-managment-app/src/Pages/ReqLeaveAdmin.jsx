import React, { useEffect } from 'react'
import NavBar from '../Component/NavBar'
import TitleBar from '../Component/TitleBar'
import ReqLeaveAdminCenter from '../Component/ReqLeaveAdminCenter'
import { useNavigate } from "react-router-dom";
function ReqLeaveAdmin() {

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
        <ReqLeaveAdminCenter/>
      </div>
    </div>
    </div>
  )
}

export default ReqLeaveAdmin