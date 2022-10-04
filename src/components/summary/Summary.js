import React from "react";
import useLanguages from "../../hooks/useLanguages";
import useReports from "../../hooks/useReports";
import Widget from "../widget/Widget";
import Chart from "./Chart";
import "./Summary.scss";

const Summary = ({ column, row }) => {
	const { __ } = useLanguages();
  const { reports } = useReports();

  const zero = { rx: 0, tx: 0 };

  const day = reports.getDay();
  const dA = day.at(-1) ?? zero;
  const dB = day.at(-2) ?? zero;
  const dH = Math.max(dA.rx, dA.tx, dB.rx, dB.tx);

  const month = reports.getMonth();
  const mA = month.at(-1) ?? zero;
  const mB = month.at(-2) ?? zero;
  const mH = Math.max(mA.rx, mA.tx, mB.rx, mB.tx);

  const t = reports.getTotal();
  const tH = Math.max(t.rx, t.tx);

  return (
    <Widget column={column} row={row} className="summary">
      <div className="summary__charts">
        <div className="summary__charts-group is-day">
          <Chart name="dayA" item={dA} higher={dH} />
          <Chart name="dayB" item={dB} higher={dH} />
        </div>
        <div className="summary__charts-group is-month">
          <Chart name="monthA" item={mA} higher={mH} />
          <Chart name="monthB" item={mB} higher={mH} />
        </div>
        <div className="summary__charts-group is-total">
          <Chart name="total" item={t} higher={tH} __={__} />
        </div>
      </div>
    </Widget>
  );
};

export default Summary;
