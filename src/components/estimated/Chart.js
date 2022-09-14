import React from "react";
import { formatTraffic } from "../../services/helpers";

const Chart = ({ count, rx, tx, title }) => {
  const max = rx + tx;
  const calcRX = Math.round((rx / max) * 100);
  const calcTX = Math.round((tx / max) * 100);

  return (
    <div className="estimated__item">
      <h3>/{title}</h3>
      <div className="estimated__chart">
        <div className="rx">
          <div style={{ height: calcRX + "%", "--height": calcRX + "%" }}></div>
        </div>
        <div className="tx">
          <div style={{ height: calcTX + "%", "--height": calcTX + "%" }}></div>
        </div>
      </div>
      <ul className="estimated__list">
        <li className="rx">{formatTraffic(rx / count)}</li>
        <li className="tx">{formatTraffic(tx / count)}</li>
        <li className="total">{formatTraffic((rx + tx) / count)}</li>
      </ul>
    </div>
  );
};

export default Chart;
