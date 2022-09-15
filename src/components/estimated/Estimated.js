import React from "react";
import { AppContext } from "../../AppContext";
import { DateTime, Interval } from "luxon";
import Widget from "../widget/Widget";
import Chart from "./Chart";
import "./Estimated.css";

const Estimated = ({ column, row }) => {
  const { reports, __ } = React.useContext(AppContext);
  const traffic = reports.getTraffic();
  const updated = reports.getUpdated();
  const updatedObj = { ...updated.date, ...updated.time };
  const datetime = DateTime.fromObject({ ...updatedObj });

  // Based on the vnstat getestimates() at /src/misc.c
  function getEstimates(type) {
    let rx = 0;
    let tx = 0;
    let div;
    let mult;

    switch (type) {
      case "day":
        rx = traffic.day.at(-1).rx;
        tx = traffic.day.at(-1).tx;
        div = Interval.fromDateTimes(
          { ...updatedObj, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        mult = 86400;
        break;
      case "month":
        rx = traffic.month.at(-1).rx;
        tx = traffic.month.at(-1).tx;
        div = Interval.fromDateTimes(
          { ...updatedObj, day: 1, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        mult = 86400 * datetime.daysInMonth;
        break;
      case "year":
        rx = traffic.year.at(-1).rx;
        tx = traffic.year.at(-1).tx;
        div = Interval.fromDateTimes(
          { ...updatedObj, month: 1, day: 1, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        mult = 86400 * datetime.daysInYear;
        break;
      default:
        div = 0;
        mult = 0;
    }

    if (div > 0) {
      rx = (rx / div) * mult;
      tx = (tx / div) * mult;
    }

    return { rx: rx, tx: tx };
  }

  let estimated = [
    { type: "day", title: __("Today"), ...getEstimates("day") },
    { type: "month", title: __("Month"), ...getEstimates("month") },
    { type: "year", title: __("Year"), ...getEstimates("year") },
  ];

  return (
    <Widget column={column} row={row} className="estimated">
      <h2>{__("Estimated")}</h2>
      {estimated.map((item) => (
        <Chart key={Math.random()} {...item} />
      ))}
    </Widget>
  );
};

export default Estimated;
