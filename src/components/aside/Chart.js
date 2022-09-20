import React from "react";
import { formatTraffic } from "../../services/helpers";

const Chart = ({ rx, tx, title }) => {
  const max = rx + tx;
  const calcRX = Math.round((rx / max) * 100);
  const calcTX = Math.round((tx / max) * 100);

  return (
    <div className="aside__item">
      <h3>{title}</h3>
      <div className="aside__chart">
        <div className="rx">
          <span
            style={{ height: calcRX + "%", "--height": calcRX + "%" }}
          ></span>
        </div>
        <div className="tx">
          <span
            style={{ height: calcTX + "%", "--height": calcTX + "%" }}
          ></span>
        </div>
      </div>
      <ul className="aside__list">
        <li className="rx">{formatTraffic(rx)}</li>
        <li className="tx">{formatTraffic(tx)}</li>
        <li className="total">{formatTraffic((rx + tx))}</li>
      </ul>
    </div>
  );
};

export default Chart;
