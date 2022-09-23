import React from "react";
import "./Dashboard.css";

const Dashboard = ({ children }) => {
  return (
    <>
      <div className="wallpaper"></div>
      <div className="dashboard">{children}</div>
    </>
  );
};

export default Dashboard;
