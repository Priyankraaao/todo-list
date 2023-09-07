import React from "react";
import "./styles.css"; 

const Header = ({ status, count = 0 }) => {
  return (
    <div className="header-container">
      <div className="status">{status}</div>
      <div className="count-badge">{count}</div>
    </div>
  );
};

export default Header;
