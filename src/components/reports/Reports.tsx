import React from "react";
import useReports from "hooks/useReports";
import useLanguages from "hooks/useLanguages";
import useSettings from "hooks/useSettings";
import { ReportsContext } from "./ReportsContext";
import Widget, { IWidget } from "../widget/Widget";
import Cards from "./Cards";
import { IvnStat } from "services/vnstat.type";
import styles from "./Reports.module.scss";

const Reports = ({ column, row }: IWidget.ColRow) => {
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
    <Widget column={column} row={row} className={styles.reports}>
      <div className={styles.caption}>
        <h2>{__("Reports")}</h2>
        <div className={styles.menu}>
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() => setTab(item.type as IvnStat.TrafficKeys)}
              className={item.type === type ? "active" : undefined}
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
