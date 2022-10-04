import React from "react";
import useReports from "../../hooks/useReports";
import Widget from "../widget/Widget";
import "./Logo.scss";

const Logo = ({ column, row }) => {
  const { reports } = useReports();
  const version = reports.getVersion();

  return (
    <Widget column={column} row={row} className="logo">
      <h1>
        vnStat <small>{version}</small>
      </h1>
    </Widget>
  );
};

export default Logo;
