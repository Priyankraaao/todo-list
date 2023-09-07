"use client";
import React from "react";
import SideNavbar from "../SideNavigation";
import "./styles.css"; 

function Wrapper({ children }) {
  return (
    <div className="wrapper-container"> 
      <div className="sidebar">
        <SideNavbar />
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
