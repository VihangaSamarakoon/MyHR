import React, { useState, useEffect } from "react";
import "./EmployeeTable.scss";
import client from "../apiConfig";

function AttandanceAdminTable({ data, searchName, sname }) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      const fetchedNames = await Promise.all(
        data.map(async (item) => {
          try {
            const response = await client.get(`/employee/${item.user_id}`);
            return response.data.data.name;
          } catch (err) {
            console.error(err);
            return ""; 
          }
        })
      );
      setNames(fetchedNames);
    };
    if(!sname){
      fetchNames();
    }
  }, [data]);

  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          {!sname && <div className="header__item">
            <a id="name" className="filter__link" href="#">
              Employee Name
            </a>
          </div>}
          <div className="header__item">
            <a id="wins" className="filter__link filter__link--number" href="#">
              Date
            </a>
          </div>
          <div className="header__item">
            <a
              id="draws"
              className="filter__link filter__link--number"
              href="#"
            >
              Check In
            </a>
          </div>
          <div className="header__item">
            <a
              id="losses"
              className="filter__link filter__link--number"
              href="#"
            >
              Check Out
            </a>
          </div>
        </div>
        <div className="table-content">
          {data.map((dataItem, index) => (
            <div className="table-row" key={index}>
              {!sname && <div className="table-data">{names[index]}</div>}
              <div className="table-data">{dataItem.date}</div>
              <div className="table-data">{dataItem.check_in_time}</div>
              <div className="table-data">{dataItem.check_out_time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttandanceAdminTable;
