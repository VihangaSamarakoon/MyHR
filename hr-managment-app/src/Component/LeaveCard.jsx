import React from "react";
import "./LeaveCard.css";

function LeaveCard({data}) {
  return (
    <div className="leaveCard">
      <div className="row">
        <p className="p1">Start Date</p>
        <p className="p2">{data.start_date}</p>
      </div>
      <div className="row">
        <p className="p1">End Date</p>
        <p className="p2">{data.end_date}</p>
      </div>
      <div className="row">
        <p className="p1">Reason</p>
        <p className="p2">{data.reason}</p>
      </div>
      <div className="row">
        <p className="p1">Status</p>
        <p className="p2">{data.status}</p>
      </div>
      <button className="btn1 submitBtn">Edit</button>
    </div>
  );
}

export default LeaveCard;
