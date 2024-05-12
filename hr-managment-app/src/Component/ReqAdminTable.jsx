import React, { useState, useEffect } from "react";
import "./EmployeeTable.scss";
import client from "../apiConfig";

function ReqAdminTable({ data, updateData }) {
  const [editStatusDis, setEditStatusDis] = useState(false);
  const [indexEditDisplay, setIndexEditDisplay] = useState('');

  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      const fetchedNames = await Promise.all(data.map(async (item) => {
        try {
          const response = await client.get(`/employee/${item.emp_id}`);
          return response.data.data.name;
        } catch (err) {
          console.log(err.response.data.message);
          return ""; 
        }
      }));
      setNames(fetchedNames);
    };

    fetchNames();
  }, [data]);

  async function acceptReqLeave(id, status, update) {
    await client
      .post("/admin/leave", {
        _id: id,
        status: status,
      })
      .then((response) => {
        if (update) {
          console.log(response.data.message);
          alert(response.data.message);
          createNotification(id);
          updateData();
          setEditStatusDis(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function accept(id) {
    const status = "accept";
    const update = true;
    acceptReqLeave(id, status, update);
  }
  function decline(id) {
    const status = "decline";
    const update = true;
    acceptReqLeave(id, status, update);
  }
  function editStatus(id, index) {
    const status = "pending";
    const update = false;
    setIndexEditDisplay(index);
    setEditStatusDis(true);
    acceptReqLeave(id, status, update);
  }

  async function createNotification(id){
    client.post('/notification',{
        _id: id
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <a id="name" className="filter__link" href="#">
              Employee Name
            </a>
          </div>
          <div className="header__item">
            <a id="wins" className="filter__link filter__link--number" href="#">
              Start Date
            </a>
          </div>
          <div className="header__item">
            <a
              id="draws"
              className="filter__link filter__link--number"
              href="#"
            >
              End Date
            </a>
          </div>
          <div className="header__item">
            <a
              id="losses"
              className="filter__link filter__link--number"
              href="#"
            >
              Reason
            </a>
          </div>
          <div className="header__item">
            <a
              id="total"
              className="filter__link filter__link--number"
              href="#"
            ></a>
          </div>
        </div>
        <div className="table-content">
          {data.map((data, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">{names[index]}</div>
              <div className="table-data">{data.start_date}</div>
              <div className="table-data">{data.end_date}</div>
              <div className="table-data">{data.reason}</div>
              <div className="table-data">

                {data.status === "pending" && (
                  <>
                    <button
                      className="small-btn"
                      onClick={() => accept(data._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="small-btn"
                      onClick={() => decline(data._id)}
                    >
                      Decline
                    </button>
                  </>
                )}
                {data.status !== "pending" && !editStatusDis &&  (
                  <button
                    className="small-btn"
                    onClick={() => editStatus(data._id, index)}
                  >
                    Edit
                  </button>
                )}

                {editStatusDis && data.status !== "pending" && indexEditDisplay === index && (
                  <>
                    <button
                      className="small-btn"
                      onClick={() => accept(data._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="small-btn"
                      onClick={() => decline(data._id)}
                    >
                      Decline
                    </button>
                  </>
                )}
                {data.status !== "pending" && editStatusDis && indexEditDisplay !== index && (
                  <button
                    className="small-btn"
                    onClick={() => editStatus(data._id, index)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReqAdminTable;
