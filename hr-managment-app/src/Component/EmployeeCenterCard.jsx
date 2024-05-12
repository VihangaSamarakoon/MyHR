import React, { useState, useEffect } from 'react'
import "./EmployeeCenterCard.css";
import "../index.css";
import client from "../apiConfig";
import EmployeeTable from './EmployeeTable';
import EmployeeAddCard from './EmployeeAddCard';
import {Unauthorized} from '../Error/AdminError'

function EmployeeCenterCard() {
  const [display,setDisplay] = useState(false);
  const [employeeData,setEmployeeData] = useState([]);
  const [searchName,setSearchName] = useState("");


  useEffect(() => {
    fetchEmp();
  }, []);


  async function fetchEmp() {
    try {
      const response = await client.get("/employee", { withCredentials: true });
      const data = response.data;

     
      const formattedData = data.map((emp) => {
        const date = new Date(emp.join_date);
        const formattedJoinDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        return { ...emp, join_date: formattedJoinDate };
      });

      setEmployeeData(formattedData);

    } catch (err) {
      Unauthorized(err);
    console.log(err.response);
    }
  }

  const filterData = employeeData.filter(item => {
    const itemNameLowerCase = item.name.toLowerCase(); 
    const searchNameLowerCase = searchName.toLowerCase();
    return itemNameLowerCase.includes(searchNameLowerCase);
  });
  
  


  return (
    <div className="centerContents">
    <div className="firstRow">
      <div className="Search">
        <input type="text" placeholder="Search..." className="search-input1" onChange={(e)=> setSearchName(e.target.value)}/>
      </div>

      <div className="topbtn">
      <button className="btn" onClick={() => setDisplay(true)}> {/* Use button instead of Link */}
            Add Employee +
          </button>
      </div>
    </div>

    <div className="firstRo">
    <EmployeeTable data={searchName ? filterData : employeeData} fetchEmp={fetchEmp}/>
    </div>
    {display && (
        <div className="modal">
          <div className="modal-content">
            <EmployeeAddCard setDisplay={setDisplay} fetchEmp={fetchEmp}/>
          </div>
        </div>
      )}
  </div>
  )
}

export default EmployeeCenterCard