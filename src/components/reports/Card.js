import React from "react";
import { DateTime } from "luxon";

const Card = ({ type, item, index, max }) => {
  function theTitle() {
    const date = DateTime.fromObject({ ...item.date, ...item.time });
    switch (type) {
      case "fiveminute":
      case "hour":
        return date.toLocaleString(DateTime.TIME_SIMPLE);
      case "day":
        return date.day;
      case "month":
        return date.monthLong;
      case "year":
        return date.year;
      case "top":
        return date.toLocaleString(DateTime.DATE_SHORT);
      default:
        return "";
    }
  }

  return (
    <li style={{ "--order": index }}>
      <div className="col-name">
        {type === "top" ? (
          <strong>{(index + 1).toString().padStart(2, 0)}</strong>
        ) : null}
        {theTitle()}
      </div>
      <div className="col-chart">
        <div>
          <span
            className="rx"
            style={{ width: Math.round((item.rx / max) * 100) + "%" }}
          ></span>
          <span
            className="tx"
            style={{ width: Math.round((item.tx / max) * 100) + "%" }}
          ></span>
        </div>
      </div>
      <div className="col-rx">{item.rx_formatted}</div>
      <div className="col-tx">{item.tx_formatted}</div>
      <div className="col-total">{item.total_formatted}</div>
      <div className="col-rate">{item.rate_formatted}</div>
    </li>
  );
};

export default Card;
