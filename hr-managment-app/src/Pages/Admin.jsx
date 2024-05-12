import React, { useEffect} from "react";
import "../Component/LoginStyle.css";
import NavBar from "../Component/NavBar";
import TitleBar from "../Component/TitleBar";
import DashboardCenterCard from '../Component/DashboardCenterCard';
import { useNavigate } from "react-router-dom";

function Admin() {
    
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
        <NavBar />
      </div>

      <div className="col-r">
        <TitleBar />
        <DashboardCenterCard/>
      </div>
    </div>
    </div>
  );
}

export default Admin;
