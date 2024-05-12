import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

function ImageView({ imgUrlBuffer, setDisplay, str2 }) {



    return (
        <div>
            <div className="employee-add-container">
                <div className="employee-add-card">
                    <div className="close-btn-wrapper">
                        <button className="close-btn" onClick={() => setDisplay(false)}>
                            <IoClose />
                        </button>
                    </div>
                    <div className="loginTxt">
                        <span style={{ color: "#fff" }}>Employee </span>
                        <span style={{ color: "#fff" }}>{str2}</span>
                    </div>
                    <img src={`${imgUrlBuffer}`} width="526px" height="690px"/>
                </div>
            </div>
        </div>
    );
}

export default ImageView;
