import React, { useContext, useEffect, useState } from "react";
import "./LoginStyle.css";
// import axios from "axios";
import client from "../apiConfig";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../Context/Auth";

function Login({ userType }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const { setUserId } = useContext(UserAuthContext);

  useEffect(() => {}, []);

  const authAdmin = async () => {
    await client
      .post(
        "/admin/login",
        {
          username: userName,
          password: userPwd,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        sessionStorage.setItem('AloginStatus',"true");
        alert(response.data.message);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err.resopnse.data.message);
      });
  };
  const authEmp = async () => {
    await client
      .post("/employee/login", {
        name: userName,
        password: userPwd,
      })
      .then((response) => {
        console.log(response.data.message);
        sessionStorage.setItem('userID',response.data.emp_id);
        sessionStorage.setItem('UloginStatus',"true");
        setUserId(response.data.emp_id);
        navigate("/user");
      })
      .catch((err) => {
        console.log(err.resopnse.data.message);
      });
  };

  function handleUserName(e) {
    const userName = e.target.value;
    setUserName(userName);
  }
  function handleUserPwd(e) {
    const password = e.target.value;
    setUserPwd(password);
  }
  function handleLogin(e) {
    e.preventDefault();
    if (userName === "" || userPwd === "") {
      alert("field cannot be null");
    } else if (userType === "Admin") {
      authAdmin();
    } else if (userType === "Emp") {
      authEmp();
    }
  }
  return (
    <>
      {/* <div className="topBar">
        <Logo />
      </div> */}
      <div className="loginContainer">
        <div className="loginCard">
          <div className="loginTxt">
            <span style={{ color: "#fff" }}>Log</span>
            <span style={{ color: "#fff" }}>in</span>
          </div>

          <form action="" className="loginForm">
            <p className="loginp1">Enter Username</p>
            <input type="text" 
            className="loginInput"
            onChange={handleUserName}
            value={userName} 
            />

            <p className="loginp1">Enter Password</p>
            <input type="password" 
            className="loginInput" 
            onChange={handleUserPwd}
            />

            <button type="submit" className="btn3" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
     
    </>
  );
}

export default Login;
