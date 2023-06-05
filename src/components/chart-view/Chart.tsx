import React from "react";
import {
  bb,
  bar,
  areaSpline,
  zoom,
  ChartOptions,
  ChartTypes,
  Chart as bbChart,
} from "billboard.js";
import { DateTime } from "luxon";
import useSettings from "hooks/useSettings";
import { IvnStat } from "services/vnstat.type";
import "billboard.js/dist/billboard.css";
import "./billboard.scss";
import useHelpers from "hooks/useHelpers";

const Chart = ({ type, traffic }: Props) => {
  const { settings } = useSettings();
  const { formatTraffic } = useHelpers();
  const ref = React.useRef<HTMLDivElement>(null);
  const instance = React.useRef<bbChart>();

  const defaults: ChartOptions = {
    data: {
      x: "x",
      columns: [],
      // groups: [["RX", "TX"]], // This makes log scales oversize the chart!
    },
    zoom: {
      enabled: zoom(),
    },
    clipPath: false,
    spline: {
      interpolation: {
        type: "monotone-x",
      },
    },
    color: {
      pattern: ["var(--rx)", "var(--tx)"],
    },
    area: {
      linearGradient: true,
    },
    bar: {
      // linearGradient: true,
      padding: 3,
    },
    legend: {
      position: "inset",
    },
    point: {
      show: false,
    },
    axis: {
      y: {
        show: false,
      },
      x: {
        type: "timeseries",
        height: 20,
        tick: {
          format: formatTick,
        },
        padding: {
          right: 0,
          left: 0,
        },
      },
    },
    tooltip: {
      format: {
        title: formatTooltipTitle,
        value: formatTraffic,
      },
    },
    grid: {
      x: {
        lines: [],
      },
      y: {
        show: false,
        // lines: [
        // 	{ value: Math.pow(1024, 2), text: 'MB', position: 'start' },
        // 	{ value: Math.pow(1024, 3), text: 'GB', position: 'start' },
        // ]
      },
    },
  };

  // Format Tooltip titles

  function formatTooltipTitle(value: Date): string {
    const date = DateTime.fromJSDate(value);
    switch (type) {
      case "fiveminute":
      case "hour":
        return date.toLocaleString(DateTime.DATETIME_SHORT);
      case "day":
        return date.toLocaleString(DateTime.DATE_SHORT);
      case "month":
        return date.monthLong + " " + date.year;
      case "year":
        return date.year.toString();
      default:
        return "";
    }
  }

  // Format Ticks

  function formatTick(value: Date): string | number {
    const date = DateTime.fromJSDate(value);
    switch (type) {
      case "fiveminute":
      case "hour":
        return date.toLocaleString(DateTime.TIME_SIMPLE);
      case "day":
        return date.day;
      case "month":
        return date.monthLong ?? "";
      case "year":
        return date.year;
      default:
        return "";
    }
  }

  // Create addicional grid lines

  function getGridLines(type: string, data: Columns[0]): GridLines[] {
    let lines: GridLines[] = [];
    data.forEach((value) => {
      if (typeof value === "string") return;
      let datetime = DateTime.fromJSDate(value);
      let line = false;
      if (type === "day") line = datetime.hour === 0 && datetime.minute === 0;
      else if (type === "month") line = datetime.day === 1;
      if (line) lines.push({ value: value });
    });
    return lines;
  }

  // Get columns

  function getColumns(): Columns {
    let columns: Columns = [["x"], ["RX"], ["TX"]];
    traffic.forEach((item) => {
      columns[0].push(
        DateTime.fromObject({ ...item.date, ...item.time }).toJSDate()
      );
      columns[1].push(item.rx);
      columns[2].push(item.tx);
    });
    return columns;
  }

  // Mount the correct zoom range

  function getZoomRange(columns: Columns, start: number): ZoomRange {
    const x = columns[0];
    const min = x.length - 1;
    if (start > min) start = min;
    return [x.at(-start) as Date, x.at(-1) as Date];
  }

  // Get selected settings

  function getChartType(): ChartTypes {
    const name = `chart_${type}_type` as keyof typeof settings;
    if (settings[name] === "bar") return bar();
    return areaSpline();
  }

  function getChartLog(): object {
    const name = `chart_${type}_log` as keyof typeof settings;
    if (settings[name]) {
      let logMin = type === "day" ? Math.pow(1000, 2) : 1000; // MB : KB
      return {
        show: false,
        type: "log",
        min: logMin,
        max: Math.pow(1000, 4), // TB
      };
    }
    return { show: false };
  }

  // Define chart options according to report type and settings

  let options: ChartOptions = { ...defaults };
  let zoomRange: ZoomRange;
  const columns: Columns = getColumns();

  options.data!.type = getChartType();
  options.axis!.y = getChartLog();

  switch (type) {
    case "fiveminute":
      options.grid!.x!.lines = getGridLines("day", columns[0]);
      options.axis!.x!.tick!.count = 100;
      zoomRange = getZoomRange(columns, 288); // 24h
      break;
    case "hour":
      options.grid!.x!.lines = getGridLines("day", columns[0]);
      zoomRange = getZoomRange(columns, 48); // 48h
      break;
    case "day":
      // options.grid.x.lines = getGridLines("month", columns[0]);
      zoomRange = getZoomRange(columns, 30);
      break;
    case "month":
      zoomRange = getZoomRange(columns, 12);
      break;
    case "year":
      zoomRange = getZoomRange(columns, 10);
      break;
    default:
  }

  // FIXME: Billboard zoom doesn't work well with bars

  let zoomEnable = true;
  let name = `chart_${type}_type` as keyof typeof settings;
  if (settings[name] === "bar") {
    zoomEnable = false;
    options.axis!.x!.padding = {};
  }

  // Initiate

  React.useEffect(() => {
    if (!instance.current) {
      instance.current = bb.generate({
        ...options,
        bindto: ref.current,
      });
      instance.current.load({ columns: columns });
      if (zoomEnable && zoomRange) instance.current.zoom(zoomRange);
    }
    return () => {
      if (instance.current) {
        instance.current.destroy();
        instance.current = undefined;
      }
    };
  });

  return <div ref={ref} />;
};

export default Chart;

type Props = {
  type: IvnStat.TrafficKeys;
  traffic: IvnStat.Traffic[];
};

type GridLines = {
  value: Date;
};

type Columns = [[string | Date], [string | number], [string | number]];

type ZoomRange = [string | number | Date, string | number | Date];
