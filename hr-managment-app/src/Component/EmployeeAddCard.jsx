import React, { useState, useEffect } from "react";
import "./EmployeeAddCard.css"; // Updated CSS file name
import { IoClose } from "react-icons/io5";
import client from "../apiConfig";

function EmployeeAddCard({ setDisplay, fetchEmp, editEmp, edit  }) {
  const [cv, setCv] = useState("");
  const [idImage, setIdImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passReset, setPassReset] = useState(false);

  const today = new Date();
  const todayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  useEffect(()=>{
    if(edit){
      setName(editEmp.name);
      setEmail(editEmp.email);
    }
  },[]);

  function handleRegister(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (name === "" || email === "" || password === "") {
      alert("Please Complete the form");
    }
    else if(!nameRegex.test(name)){
      alert("Please Enter Valid Name");
    }
    else if(!emailRegex.test(email)){
      alert("Please Enter Valid Email");
    }
    else {
      client
        .post("/employee", {
          name: name,
          email: email,
          password: password,
          join_date: todayDate,
          cv: cv,
          userImage: userImage,
          idImage: idImage,
        })
        .then((response) => {
          console.log(response.data.message);
          alert(response.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setCv("");
          setIdImage("");
          setUserImage("");
          fetchEmp();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEdit(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (name === "" || email === "" || password === "") {
      alert("Please Complete the form");
    }
    else if(!nameRegex.test(name)){
      alert("Please Enter Valid Name");
    }
    else if(!emailRegex.test(email)){
      alert("Please Enter Valid Email");
    }
     else {
      client
        .put(`/employee/${editEmp._id}`, {         
          name: name,
          email: email,
          password: password,
          cv: cv,
          userImage: userImage,
          idImage: idImage,
          // id: editEmp._id,
        })
        .then((response) => {
          console.log(response.data.message);
          alert(response.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setCv("");
          setIdImage("");
          setUserImage("");
          fetchEmp();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  const uploadCv = async (e) => {
    const file = e.target.files[0];
    if (!validateFileType(file)) {
      alert("Please upload a valid image file for CV");
      return;
    }
    const dataUrl = await convertBase64(file);
    const base64Data = dataUrl.split(",")[1];
    setCv(base64Data);
  };

  const uploadUserImage = async (e) => {
    const file = e.target.files[0];
    if (!validateFileType(file)) {
      alert("Please upload a valid image file for User Image");
      return;
    }
    const dataUrl = await convertBase64(file);
    const base64Data = dataUrl.split(",")[1];
    setUserImage(base64Data);
  };

  const uploadID = async (e) => {
    const file = e.target.files[0];
    if (!validateFileType(file)) {
      alert("Please upload a valid image file for ID");
      return;
    }
    const dataUrl = await convertBase64(file);
    const base64Data = dataUrl.split(",")[1];
    setIdImage(base64Data);
  };

  const validateFileType = (file) => {
    return file && file.type.startsWith("image/");
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="employee-add-container">
      <div className="employee-add-card">
        <div className="close-btn-wrapper">
          <button className="close-btn" onClick={() => setDisplay(false)}>
            <IoClose />
          </button>
        </div>
        <div className="loginTxt">
          <span style={{ color: "#fff" }}>Add </span>
          <span style={{ color: "#fff" }}>Employee</span>
        </div>

        <form action="" className="employee-add-form">
          <p className="loginp1">Enter Username</p>
          <input
            type="text"
            className="loginInput"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <p className="loginp1">Enter Email</p>
          <input
            type="text"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className="loginp1">Password</p>
          {(passReset || !edit) && (
            <>
             <input
            type="password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
            </>
          )}
         
          {edit && (
            <button onClick={(e)=>{e.preventDefault();setPassReset(true);}}>Reset</button>
          )}

          <p className="loginp1">Add Cv</p>
          {/* <button className="employee-add-file-btn"><FaFile /></button> */}
          {/* <input type="file" accept="image/*" onChange={handleCvInput} className="employee-add-file-btn"/> */}
          <input
            type="file"
            className="employee-add-file-btn"
            onChange={(e) => {
              uploadCv(e);
            }}
            style={cv ? { backgroundColor: "green",color: "#fff" } : {}}
          />
          <p className="loginp1">User Image</p>
          {/* <button className="employee-add-file-btn"><FaFile /></button> */}
          <input
            type="file"
            className="employee-add-file-btn"
            onChange={(e) => {
              uploadUserImage(e);
            }}
            style={userImage ? { backgroundColor: "green",color: "#fff" } : {}}
          />
          <p className="loginp1">Id</p>
          {/* <button className="employee-add-file-btn"><FaFile /></button> */}
           <input
            type="file"
            className="employee-add-file-btn"
            onChange={(e) => {
              uploadID(e);
            }}
            style={idImage ? { backgroundColor: "green",color: "#fff" } : {}}
          />

          <button type="submit" className="btn3" onClick={edit ? handleEdit : handleRegister}>
            {edit ? "Edit Employee" : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeAddCard;
