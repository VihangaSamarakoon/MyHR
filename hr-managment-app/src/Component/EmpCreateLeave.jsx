import React, { useState } from "react";
import "./EmployeeAddCard.css"; // Updated CSS file name
import { IoClose } from "react-icons/io5";
import client from "../apiConfig";

function EmpCreateLeave({ setDisplay, getLeave }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  async function creteLeaveReq(e) {
    e.preventDefault();
    if(startDate ==='' || endDate==='' || reason === '' ){
      alert("Please Complete Form");
      return;
    }
    const empId = sessionStorage.getItem("userID");
    await client
      .post("/employee/leave", {
        emp_id: empId,
        start_date: startDate,
        end_date: endDate,
        reason: reason,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        getLeave();
        setStartDate('');
        setEndDate('');
        setReason('');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="employee-add-container">
      <div className="employee-add-card">
        <div className="close-btn-wrapper">
          <button className="close-btn" onClick={() => setDisplay(false)}>
            <IoClose />
          </button>
        </div>
        <div className="loginTxt">
          <span style={{ color: "#fff" }}>Leave </span>
          <span style={{ color: "#fff" }}>Request</span>
        </div>

        <form action="" className="employee-add-form">
          <p className="loginp1">Enter Start Date</p>
          <input
            type="Date"
            className="loginInput"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />

          <p className="loginp1">Enter End Date</p>
          <input
            type="Date"
            className="loginInput"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />
          <p className="loginp1">Reason</p>
          {/* <input type="text" className="loginInput" /> */}
          <textarea
            name="text"
            rows="6"
            cols="8"
            wrap="soft"
            className="loginInput-reason"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          >
            {" "}
          </textarea>

          <button type="submit" className="btn3" onClick={creteLeaveReq}>
            Create Leave
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmpCreateLeave;
