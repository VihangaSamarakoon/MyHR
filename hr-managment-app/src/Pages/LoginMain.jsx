import React from "react";
import { useNavigate } from "react-router-dom";

function LoginMain() {
  const navigate = useNavigate();

  function navAdminLogin() {
    navigate("/adminlogin");   
  }
  function navEmpLogin() {
    navigate("/userlogin");    
  }
  return (
    <div className="container">
      <div className="mainContent">
        <div className="row">
          <h3 className="h3-1 titletxt">Welcome To HR Management System</h3>
        </div>

        <div className="row">
          <div className="btn-group">
            <button onClick={navAdminLogin} className="btn1">
              Admin
            </button>
            <button onClick={navEmpLogin} className="btn1">
              Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginMain;
