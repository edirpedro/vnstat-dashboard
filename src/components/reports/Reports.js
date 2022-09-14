import React from "react";
import { AppContext } from "../../AppContext";
import { ReportsContext } from "./ReportsContext";
import Widget from "../widget/Widget";
import Cards from "./Cards";
import "./Reports.css";

const Reports = ({ column, row, initial }) => {
  const { reports, __ } = React.useContext(AppContext);
	const { tab, setTab } = React.useContext(ReportsContext);

  const type = tab ?? initial;
  const traffic = reports.getTraffic(type);

  const menu = [
    { type: "top", title: __("Top") },
    { type: "fiveminute", title: __("Minutes") },
    { type: "hour", title: __("Hours") },
    { type: "day", title: __("Days") },
    { type: "month", title: __("Months") },
    { type: "year", title: __("Years") },
  ];

  return (
    <Widget column={column} row={row} className="reports">
      <div className="reports__caption">
        <h2>{__("Reports")}</h2>
        <div className="reports__menu">
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() => setTab(item.type)}
              className={item.type === type ? "active" : null}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <Cards type={type} traffic={traffic} />
    </Widget>
  );
};

export default Reports;