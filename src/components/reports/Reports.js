import React from "react";
import useReports from "../../hooks/useReports";
import useLanguages from "../../hooks/useLanguages";
import useSettings from "../../hooks/useSettings";
import { ReportsContext } from "./ReportsContext";
import Widget from "../widget/Widget";
import Cards from "./Cards";
import "./Reports.scss";

const Reports = ({ column, row }) => {
  const { __ } = useLanguages();
  const { reports } = useReports();
  const { settings } = useSettings();
  const { tab, setTab } = React.useContext(ReportsContext);

  const type = tab ?? settings.reports_initial;
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
