import React, { useEffect } from 'react'
import EmpNavBar from '../Component/EmpNavBar'
import TitleBar from '../Component/TitleBar'
import EmpNoticeCenter from '../Component/EmpNoticeCenter'
import { useNavigate } from "react-router-dom";

function EmpNotice() {

  const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionStorage.getItem("UloginStatus") !== "true") {
      navigate("/adminlogin");
    }
  }, [navigate]);


  return (
    <div>
         <div className="content">
    <div className="container">
    <div className="col-l">
      <EmpNavBar />
    </div>

    <div className="col-r">
      <TitleBar />
      <EmpNoticeCenter/>
    </div>
  </div>
  </div>
    </div>
  )
}

export default EmpNotice;