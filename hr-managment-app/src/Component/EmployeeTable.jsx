import React, { useState } from "react";
import "./EmployeeTable.scss";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import client from "../apiConfig";
import ImageView from "./ImageView";
import EmployeeAddCard from "./EmployeeAddCard";

function EmployeeTable({ data, fetchEmp }) {
  const [imageURL, setImageURL] = useState("");
  const [disImage, setDisImage] = useState(false);
  const [str2,setStr2] = useState("");
  const [display,setDisplay] = useState(false);
  const [editEmp, setEditEmp] = useState([]);
  const [edit, setEdit] = useState("");

  function handleDelete(id) {
    client
      .delete(`/employee/${id}`)
      .then((res) => {
        alert(res.data.message);
        fetchEmp();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleImageView(imageUrl) {
    setImageURL(imageUrl);
    setDisImage(true);
  }

  function handleEdit(emp){
    setDisplay(true);
    console.log("This is emp",emp);
    setEdit(true);
    setEditEmp(emp); 
  }

  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <a id="name" className="filter__link" href="#">
              Name
            </a>
          </div>
          <div className="header__item">
            <a id="wins" className="filter__link filter__link--number" href="#">
              Email
            </a>
          </div>
          <div className="header__item">
            <a
              id="draws"
              className="filter__link filter__link--number"
              href="#"
            >
              Join Date
            </a>
          </div>
          <div className="header__item">
            <a
              id="losses"
              className="filter__link filter__link--number"
              href="#"
            >
              Cv
            </a>
          </div>
          <div className="header__item">
            <a
              id="total"
              className="filter__link filter__link--number"
              href="#"
            >
              User Image
            </a>
          </div>
          <div className="header__item">
            <a
              id="total"
              className="filter__link filter__link--number"
              href="#"
            >
              Id Image
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
          {data.map((employee, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">{employee.name}</div>
              <div className="table-data">{employee.email}</div>
              <div className="table-data">{employee.join_date}</div>
              <div className="table-data">
                <button onClick={() => {handleImageView(employee.cv);setStr2("Cv")}}>
                  View
                </button>
              </div>
              <div className="table-data">
                <button onClick={() => {handleImageView(employee.userImage);setStr2("Image")}}>
                  View
                </button>
              </div>
              <div className="table-data">
                <button onClick={() => {handleImageView(employee.idImage);setStr2("ID")}}>
                  View
                </button>
              </div>
              <div className="table-data">
                <button className="small-btn" onClick={() => handleEdit(employee)}>
                  <FaEdit />
                </button>
                <button
                  className="small-btn"
                  onClick={() => handleDelete(employee._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {disImage && (
        <>
          <ImageView imgUrlBuffer={imageURL} setDisplay={setDisImage} str2={str2}/>
        </>
      )}
       {display && (
        <div className="modal">
          <div className="modal-content">
            <EmployeeAddCard setDisplay={setDisplay} fetchEmp={fetchEmp} editEmp={editEmp} edit={edit}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
