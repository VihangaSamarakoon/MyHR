import React from "react";
import "./EmployeeTable.scss";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function EmpReqTable({data}) {
  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <a id="wins" className="filter__link filter__link--number" href="#">
              Start Date
            </a>
          </div>
          <div className="header__item">
            <a id="draws" className="filter__link filter__link--number" href="#">
              End Date
            </a>
          </div>
          <div className="header__item">
            <a id="losses" className="filter__link filter__link--number" href="#">
              Reason
            </a>
          </div>
          <div className="header__item">
            <a id="losses" className="filter__link filter__link--number" href="#">
              Status
            </a>
          </div>
        </div>
        <div className="table-content">
          {data.map((item, index) => (
            <div className="table-row" key={index ? index : 'No Data'}>
              <div className="table-data">{item.start_date}</div>
              <div className="table-data">{item.end_date}</div>
              <div className="table-data">{item.reason}</div>
              <div className="table-data">{item.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmpReqTable;
