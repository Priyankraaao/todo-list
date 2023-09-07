import React, { useState } from "react";
import { FaArrowLeft, FaSketch } from "react-icons/fa";
import { useParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import "./styles.css";
import navigationItems from "@/configurations/SIDE_NAV_MAPPING";

function SideNavbar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const navigationSecondaryItems = [
    {
      label: "Setting",
      key: "setting",
      onClickFunction: async () => {
        console.log("log");
      },
      icon: FaSketch,
    },
    {
      label: "LogOut",
      key: "logout",
      onClickFunction: async () => {
        try {
          await axios.get("/api/users/logout/");
          router.push("/login");
        } catch (error) {
          console.log("error", error);
        }
      },
      icon: FaArrowLeft,
    },
  ];

  const onNavClick = (item) => {
    router.push(`/profile/${params.user_id}/${item.href}`);
  };

  return (
    <nav className="left-navigation">
      <div className="navigation-header">Assigment</div>
      <ul style={{ height: "100vh" }}>
        {navigationItems.map((item) => (
          <li
            className={pathname.includes(item.key) ? "active-nav" : ""}
            onClick={() => onNavClick(item)}
            key={item.key}
          >
            {item.icon()}
            <a>{item.label}</a>
          </li>
        ))}
      </ul>
      <ul>
        {navigationSecondaryItems.map((item) => (
          <li
            className={pathname.includes(item.key) ? "active-nav" : ""}
            onClick={() => item.onClickFunction(item)}
            key={item.key}
          >
            {item.icon()}
            <a>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNavbar;
