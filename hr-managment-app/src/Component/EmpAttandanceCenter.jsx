import React, { useState, useEffect } from "react";
import "./EmployeeCenterCard.css";
import "../index.css";
import EmpAttandanceTable from "./EmpAttandanceTable";
import client from "../apiConfig";

function EmpAttandanceCenter() {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    getAttandance();
  }, []);

  async function getAttandance() {
    try {
      const empId = sessionStorage.getItem("userID");
      const response = await client.get(`employee/attendance`, {
        params: {
          user_id: empId,
        },
      });
      const data = response.data;
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  function checkIn() {
    const empId = sessionStorage.getItem("userID");
    client
      .post("employee/checkin", {
        user_id: empId,
      })
      .then((res) => {
        console.log(res.data.message);
        setClicked(true);
        localStorage.setItem("checkIn", res.data.newAttandance);
        getAttandance();
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
  function checkOut() {
    const applicationId = localStorage.getItem("checkIn");
    client
      .post("employee/checkout", {
        _id: applicationId,
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("checkIn");
        setClicked(false);
        getAttandance();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="centerContents">
      <div className="firstRow">
        <button
          style={{ backgroundColor: "green", color: "#fff" }}
          className="btn"
          onClick={checkIn}
        >
          Check In
        </button>
        <button
          style={{
            backgroundColor: "Red",
            color: "#fff",
            filter: !clicked ? "brightness(20%)" : "none",
          }}
          className="btn"
          onClick={checkOut}
          disabled={!clicked}
        >
          Check Out
        </button>
      </div>

      <div className="firstRo">
        <EmpAttandanceTable data={data} />
      </div>
    </div>
  );
}

export default EmpAttandanceCenter;
