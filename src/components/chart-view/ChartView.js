import React from "react";
import { AppContext } from "../../AppContext";
import { ReportsContext } from "../reports/ReportsContext";
import Widget from "../widget/Widget";
import Chart from "./Chart";
import "billboard.js/dist/billboard.css";
import "./billboard.css";
import "./ChartView.css";

const ChartView = ({ column, row, initial }) => {
  const { reports, __ } = React.useContext(AppContext);
	const { tab, setTab } = React.useContext(ReportsContext);

  const type = tab ?? initial;
  const traffic = reports.getTraffic(null, true);
	const iface = reports.getInterface();

  const menu = [
    { type: "fiveminute", title: __("Minutes") },
    { type: "hour", title: __("Hours") },
    { type: "day", title: __("Days") },
    { type: "month", title: __("Months") },
    { type: "year", title: __("Years") },
  ].filter((item) => traffic[item.type].length > 1);

  return (
    <ChartViewRender
      column={column}
      row={row}
      menu={menu}
      type={type}
      traffic={traffic}
      setTab={setTab}
			iface={iface}
    />
  );
};

// Prevent render if the report is not part of the menu, without data to show on a chart

const ChartViewRender = React.memo(
  ({ column, row, menu, type, traffic, setTab }) => (
    <Widget column={column} row={row} className="chart-view">
      <div className="chart-view__menu">
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
      <Chart type={type} traffic={traffic[type]} />
    </Widget>
  ),
  (prev, next) => {
		if (next.iface !== prev.iface) return false; // Interface has changed
		if (next.type === prev.type) return true; // Report type is the same
    const exists = next.menu.findIndex((el) => el.type === next.type); // Report type is not available
    return exists === -1;
  }
);

export default ChartView;
