import React from "react";
import { AppContext } from "../../AppContext";
import Widget from "../widget/Widget";
import "./Logo.css";

const Logo = ({ column, row }) => {
  const { reports } = React.useContext(AppContext);	
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
