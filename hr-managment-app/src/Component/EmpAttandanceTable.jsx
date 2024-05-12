import React from "react";
import "./EmployeeTable.scss";


function EmpAttandanceTable({data}) {


  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <a id="wins" className="filter__link filter__link--number" href="#">
              Date
            </a>
          </div>
          <div className="header__item">
            <a id="draws" className="filter__link filter__link--number" href="#">
              Check In
            </a>
          </div>
          <div className="header__item">
            <a id="losses" className="filter__link filter__link--number" href="#">
              Check Out
            </a>
          </div>
        </div>
        <div className="table-content">
          {data.map((data,index)=>(
            <div className="table-row" key={index}>
            <div className="table-data">{data.date}</div>
            <div className="table-data">{data.check_in_time}</div>
            <div className="table-data">{data.check_out_time}</div>
          </div>
          ))}
          {/* <div class="table-row">
            <div class="table-data">2023-12-01</div>
            <div class="table-data">08:10</div>
            <div class="table-data">17:00</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default EmpAttandanceTable;
