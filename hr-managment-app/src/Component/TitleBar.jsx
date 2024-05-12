import "./TitleBarStyles.css";

import React from "react";
import { IoNotifications } from "react-icons/io5";

const TitleBar = () => {
  return (
    <div className="titleBarContainer">
      <div className="titleBarItems">
        <input type="text" placeholder="Search..." className="search-input" />
        <IoNotifications size={25} className="notificationIcon" />
      </div>
    </div>
  );
};

export default TitleBar;
