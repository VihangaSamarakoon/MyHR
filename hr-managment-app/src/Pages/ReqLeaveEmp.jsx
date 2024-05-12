import React, { useEffect } from "react";
import EmpNavBar from "../Component/EmpNavBar";
import TitleBar from "../Component/TitleBar";
import EmpLeaveCenter from "../Component/EmpLeaveCenter";
import { useNavigate } from "react-router-dom";

function Employee() {
    const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionStorage.getItem("UloginStatus") !== "true") {
      navigate("/adminlogin");
    }
  }, [navigate]);


  return (
    <div className="content">
    <div className="container">
    <div className="col-l">
      <EmpNavBar />
    </div>

    <div className="col-r">
      <TitleBar />
      <EmpLeaveCenter/>
    </div>
  </div>
  </div>
  );
}

export default Employee;
