import { DateTime, Interval } from "luxon";
import Chart, { ChartProps } from "./Chart";
import useReports from "hooks/useReports";
import useLanguages from "hooks/useLanguages";

const Estimated = () => {
  const { __ } = useLanguages();
  const { reports } = useReports();
  const traffic = reports.getAllTraffic();
  const updated = reports.getUpdated();
  const updatedObj = { ...updated.date, ...updated.time };
  const datetime = DateTime.fromObject({ ...updatedObj });

  // https://github.com/vergoh/vnstat/blob/master/src/misc.c - getestimates()

  function getEstimates(type: string) {
    let rx = 0;
    let tx = 0;
    let div;
    let mult;

    switch (type) {
      case "day":
        rx = traffic.day.at(-1)?.rx ?? 0;
        tx = traffic.day.at(-1)?.tx ?? 0;
        div = Interval.fromDateTimes(
          { ...updatedObj, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        mult = 86400;
        break;
      case "month":
        rx = traffic.month.at(-1)?.rx ?? 0;
        tx = traffic.month.at(-1)?.tx ?? 0;
        div = Interval.fromDateTimes(
          { ...updatedObj, day: 1, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        mult = 86400 * (datetime.daysInMonth ?? 0);
        break;
      case "year":
        rx = traffic.year.at(-1)?.rx ?? 0;
        tx = traffic.year.at(-1)?.tx ?? 0;
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

  const estimated: ChartProps[] = [
    { type: "day", title: __("Today"), ...getEstimates("day") },
    { type: "month", title: __("Month"), ...getEstimates("month") },
    { type: "year", title: __("Year"), ...getEstimates("year") },
  ];

  return (
    <>
      {estimated.map((item) => (
        <Chart key={Math.random()} {...item} />
      ))}
    </>
  );
};

export default Estimated;
