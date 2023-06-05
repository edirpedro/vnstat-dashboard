import React from "react";
import useReports from "hooks/useReports";
import useLanguages from "hooks/useLanguages";
import useSettings from "hooks/useSettings";
import { ReportsContext, ReportsContextTab } from "../reports/ReportsContext";
import Widget, { IWidget } from "../widget/Widget";
import Chart from "./Chart";
import { IvnStat } from "services/vnstat.type";
import styltes from "./ChartView.module.scss";

const ChartView = ({ column, row }: IWidget.ColRow) => {
  const { __ } = useLanguages();
  const { reports } = useReports();
  const { settings } = useSettings();
  const { tab, setTab } = React.useContext(ReportsContext);

  let lastType = React.useRef<ReportsContextTab>();
  let type: ReportsContextTab = tab ?? settings.chart_initial;
  const traffic = reports.getAllTraffic(true);
  const iface = reports.getInterface();

  let menu: Menu[] = [
    { type: "fiveminute", title: __("Minutes") },
    { type: "hour", title: __("Hours") },
    { type: "day", title: __("Days") },
    { type: "month", title: __("Months") },
    { type: "year", title: __("Years") },
  ];

  menu = menu.filter((item) => {
    const key = item.type;
    return traffic[key].length > 1;
  });

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
  ({ column, row, menu, type, traffic, setTab }: RenderProps) => (
    <Widget column={column} row={row} className={styltes.chartView}>
      <div className={styltes.menu}>
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => setTab(item.type)}
            className={item.type === type ? "active" : undefined}
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

interface RenderProps extends IWidget.ColRow {
  menu: Menu[];
  type: IvnStat.TrafficKeys;
  traffic: IvnStat.Traffics;
  iface: string;
  setTab: React.Dispatch<React.SetStateAction<ReportsContextTab>>;
}

interface Menu {
  type: IvnStat.TrafficKeys;
  title: string;
}
