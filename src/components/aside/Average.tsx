import React from "react";
import useLanguages from "hooks/useLanguages";
import useReports from "hooks/useReports";
import Chart, { ChartProps } from "./Chart";

const Average = () => {
  const { __ } = useLanguages();
  const { reports } = useReports();
  let average: ChartProps[] = [];
  let count;
  let traffic = reports.getAllTraffic();

  // Day, discard today

  traffic.day.shift();
  if (traffic.day.length) {
    count = traffic.day.length;
    average.push({
      type: "day",
      title: __("Day"),
      rx: traffic.day.reduce((t, item) => t + item.rx, 0) / count,
      tx: traffic.day.reduce((t, item) => t + item.tx, 0) / count,
    });
  }

  // Month, discard first and last to guarantee only full months

  traffic.month.shift();
  traffic.month.pop();
  if (traffic.month.length) {
    count = traffic.month.length;
    average.push({
      type: "month",
      title: __("Month"),
      rx: traffic.month.reduce((t, item) => t + item.rx, 0) / count,
      tx: traffic.month.reduce((t, item) => t + item.tx, 0) / count,
    });
  }

  // Year, based on the last 22 months

  if (traffic.month.length >= 12) {
    count = traffic.month.length / 12;
    average.push({
      type: "year",
      title: __("Year"),
      rx: traffic.month.reduce((t, item) => t + item.rx, 0) / count,
      tx: traffic.month.reduce((t, item) => t + item.tx, 0) / count,
    });
  }

  return <>
    {average.map((item) => <Chart key={Math.random()} {...item} />)}
  </>;
};

export default Average;
