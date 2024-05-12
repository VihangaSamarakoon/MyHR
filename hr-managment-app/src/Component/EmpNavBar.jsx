import "./NavBarStyles.css";
import Logo from "./Logo";

import React from "react";

import { Link } from "react-router-dom";
import { MdDashboard, MdPeopleAlt, MdPayments } from "react-icons/md";
import { IoQrCode } from "react-icons/io5";
import client from "../apiConfig";

const EmpNavBar = () => {

  async function handleLogout(){
    try{
    const response = await client.get('/employee/logout');
    console.log(response);
    window.location.href = '/userlogin';
    sessionStorage.clear();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="navBarContainer">
      <Logo />

      <div>
        <ul className="navBarLinks">
          <li>
            <Link to="/user" className="navLi">
              <MdDashboard size={25} className="navIcon" />
              NoticeBoard
            </Link>
          </li>
          <li>
            <Link to="/user/leave" className="navLi">
              <MdPayments size={25} className="navIcon" />
              Req Leave
            </Link>
          </li>
          <li>
            <Link to="/user/attendance" className="navLi">
              <IoQrCode size={25} className="navIcon" />
              Attendance
            </Link>
          </li>
        </ul>
      </div>
      <button type="submit" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
    </div>
  );
};

export default EmpNavBar;
