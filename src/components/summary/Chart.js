import React from "react";
import { formatTraffic } from "../../services/helpers";
import { DateTime } from "luxon";
import * as d3 from "d3";

const Chart = ({ name, item, higher, __ }) => {
  const ref = React.useRef();
  const rx = item.rx;
  const tx = item.tx;

  // Title

  let title = "–";

  switch (name) {
    case "dayA":
    case "dayB":
      if (item.date)
        title = DateTime.fromObject({ ...item.date }).toRelativeCalendar();
      break;
    case "monthA":
    case "monthB":
      if (item.date) title = DateTime.fromObject({ ...item.date }).monthLong;
      break;
    case "total":
      title = __("Total");
      break;
    default:
      title = "–";
  }

  // SVG

  React.useEffect(() => {
    const bar = {
      width: 30,
      height: 1,
      margin: 3,
      total: 10,
      delay: 100,
      color: "var(--chart-background)",
      rx: "var(--rx)",
      tx: "var(--tx)",
    };

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    svg.attr("width", "100%");

    const avg = Math.ceil(higher / bar.total);
    const width = bar.width + bar.margin + bar.width;
    const height = Math.ceil((bar.height + bar.margin) * bar.total);

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    let y = 0;
    let line = 0;
    const gRX = svg.append("g").attr("class", "rx");
    const gTX = svg.append("g").attr("class", "tx");

    for (let i = 0; i < bar.total; i++) {
      line += avg;

      gRX
        .append("rect")
        .attr("x", 0)
        .attr("y", y)
        .attr("width", bar.width)
        .attr("height", bar.height)
        .attr("fill", bar.color)
        .transition()
        .ease(d3.easeLinear)
        .duration(0)
        .delay(bar.delay * i)
        .attr("fill", (i === 0 && rx > 0) || line < rx ? bar.rx : bar.color);

      gTX
        .append("rect")
        .attr("x", bar.width + bar.margin)
        .attr("y", y)
        .attr("width", bar.width)
        .attr("height", bar.height)
        .attr("fill", bar.color)
        .transition()
        .ease(d3.easeLinear)
        .duration(0)
        .delay(bar.delay * i)
        .attr("fill", (i === 0 && tx > 0) || line < tx ? bar.tx : bar.color);

      y += bar.height + bar.margin;
    }
  });

  return (
    <div className={"chart-" + name}>
      <svg ref={ref} width="100%"></svg>
      <p>{title}</p>
      <p className="rx">{formatTraffic(rx)}</p>
      <p className="tx">{formatTraffic(tx)}</p>
      <p className="sum">{formatTraffic(rx + tx)}</p>
    </div>
  );
};

export default Chart;
