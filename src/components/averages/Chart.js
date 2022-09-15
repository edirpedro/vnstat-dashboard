import React from "react";
import { formatTraffic } from "../../services/helpers";

const Chart = ({ count, rx, tx, title }) => {
  const max = rx + tx;
  const calcRX = Math.round((rx / max) * 100);
  const calcTX = Math.round((tx / max) * 100);

  return (
    <div className="averages__item">
      <h3>/{title}</h3>
      <div className="averages__chart">
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
      <ul className="averages__list">
        <li className="rx">{formatTraffic(rx / count)}</li>
        <li className="tx">{formatTraffic(tx / count)}</li>
        <li className="total">{formatTraffic((rx + tx) / count)}</li>
      </ul>
    </div>
  );
};

export default Chart;
