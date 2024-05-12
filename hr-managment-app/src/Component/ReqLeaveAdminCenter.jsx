import React, { useEffect, useState } from "react";
import "./EmployeeCenterCard.css";
import "../index.css";
import ReqAdminTable from "./ReqAdminTable";
import client from "../apiConfig";

function ReqLeaveAdminCenter() {
  const [applicationData, getApplicationData] = useState([]);
  const [selectStauts,setSelectStatus] = useState('pending');

  useEffect(()=>{
    getReqLeave();
  },[]);

  async function getReqLeave(){
    try{
      const response = await client.get('admin/leave');
      const data = response.data;
      getApplicationData(data);
    }catch(err){
      console.log(err.response.data.message);
    }
  }

  function handleStatusChange(e){
    setSelectStatus(e.target.value);
  }

  const filterData = applicationData.filter(item=>item.status === selectStauts);

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
      </div>

      <div className="firstRo">
        <ReqAdminTable data={filterData} updateData={getReqLeave}/>
      </div>
    </div>
  );
}

export default ReqLeaveAdminCenter;
