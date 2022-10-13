import React from "react";
import useReports from "../../hooks/useReports";
import useLanguages from "../../hooks/useLanguages";
import useSettings from "../../hooks/useSettings";
import { ReportsContext } from "../reports/ReportsContext";
import Widget from "../widget/Widget";
import Chart from "./Chart";
import "billboard.js/dist/billboard.css";
import "./billboard.scss";
import "./ChartView.scss";

const ChartView = ({ column, row }) => {
  const { __ } = useLanguages();
  const { reports } = useReports();
  const { settings } = useSettings();
  const { tab, setTab } = React.useContext(ReportsContext);

  let lastType = React.useRef();
  let type = tab ?? settings.chart_initial;
  const traffic = reports.getTraffic(null, true);
  const iface = reports.getInterface();

  const menu = [
    { type: "fiveminute", title: __("Minutes") },
    { type: "hour", title: __("Hours") },
    { type: "day", title: __("Days") },
    { type: "month", title: __("Months") },
    { type: "year", title: __("Years") },
  ].filter((item) => traffic[item.type].length > 1);

  // Check available type to maintain it on renders

  const exists = menu.findIndex((el) => el.type === type);
  if (exists === -1) type = lastType.current ?? "fiveminute";
  else lastType.current = type;

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
    return false;
  }
);

export default ChartView;
