import React, { useState, useEffect, useContext } from "react";
import "./EmployeeCenterCard.css";
import "../index.css";
import EmpReqTable from "./EmpReqTable";
import EmpCreateLeave from "./EmpCreateLeave";
import client from "../apiConfig";

function EmpLeaveCenter() {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [selectStauts,setSelectStatus] = useState('pending');
 
  useEffect(() => { 
    getLeave();
  }, []);

  async function getLeave(){
    try{
      const empId = sessionStorage.getItem('userID');
      const response = await client.get(`employee/leave`, {
        params: {
          emp_id: empId
        }
      });
      const data = response.data;
      setData(data);
    }catch(err){
      console.log(err);
    }
  }

  function handleStatusChange(e){
    setSelectStatus(e.target.value);
  }

  const filterData = data.filter(item=>item.status === selectStauts);

  return (
    <div className="centerContents">
      <div className="firstRow">
        <div className="Search">
        <select name="Status" id="cars" className="status-select" onChange={handleStatusChange}>
            <option value="pending">Pending</option>
            <option value="accept">Accept</option>
            <option value="decline">Decline</option>
          </select>
        </div>
        <div className="topbtn">
      <button className="btn" onClick={()=>setDisplay(true)}> 
            Create Leave Req
          </button>
      </div>
      </div>

      <div className="firstRo">
        <EmpReqTable data={filterData}/>
      </div>
      {display && (
        <div className="modal">
          <div className="modal-content">
            <EmpCreateLeave setDisplay={setDisplay} getLeave={getLeave}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmpLeaveCenter;
