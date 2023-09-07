"use client";
import React  from "react";
import SideNavbar from "../SideNavigation";

const HomePage = ({ children }) => {

  return (
    <>
    {/* <div style={{ width: "20%" }}>
          <SideNavbar />
        </div> */}
      <div style={{ width:"100%" }}>{children}</div>
    </>
  );
};

export default HomePage;
