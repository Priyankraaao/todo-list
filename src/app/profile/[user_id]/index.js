"use client";
import React from "react";
import SideNavbar from "../../../components/SideNavigation";
import ProfileDashboard from "../../../components/ProfileDashboard/Projects";


function ProfilePage(){
    return (
        <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <SideNavbar activeTab={"projects"} />
        </div>
        <div style={{ width: "80%" }}>
          <ProfileDashboard />
        </div>
      </div>
    )
}

export default ProfilePage