import "./NavBarStyles.css";
import Logo from "./Logo";

import React from "react";

import { Link } from "react-router-dom";
import { MdDashboard, MdPeopleAlt, MdPayments } from "react-icons/md";
import { IoQrCode } from "react-icons/io5";
import client from "../apiConfig";

const NavBar = () => {

  async function handleLogout(){
    try{
    const response = await client.get('/admin/logout');
    console.log(response);
    window.location.href = '/adminlogin';
    sessionStorage.clear();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="navBarContainer">
      <Logo />

      {/* <div className="user">
        <p className="p1">Rishad Ahamed</p>
        <p className="p2">rishadcol@gmail.com</p>
      </div> */}

      <div>
        <ul className="navBarLinks">
          <li>
            <Link to="/admin" className="navLi">
              <MdDashboard size={25} className="navIcon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/employee" className="navLi">
              <MdPeopleAlt size={25} className="navIcon" />
              Employee
            </Link>
          </li>
          <li>
            <Link to="/admin/leave" className="navLi">
              <MdPayments size={25} className="navIcon" />
              Req Leave
            </Link>
          </li>
          <li>
            <Link to="/admin/attendance" className="navLi">
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

export default NavBar;
