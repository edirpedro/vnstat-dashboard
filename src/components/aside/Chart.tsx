import { formatTraffic } from "services/helpers";
import styles from "./Aside.module.scss";

const Chart = ({ rx, tx, title }: ChartProps) => {
  const max = rx + tx;
  const calcRX = Math.round((rx / max) * 100);
  const calcTX = Math.round((tx / max) * 100);

  return (
    <div className={styles.item}>
      <h3>{title}</h3>
      <div className={styles.chart}>
        <div className="rx">
          <span
            style={{ height: calcRX + "%", "--height": calcRX + "%" } as React.CSSProperties}
          ></span>
        </div>
        <div className="tx">
          <span
            style={{ height: calcTX + "%", "--height": calcTX + "%" } as React.CSSProperties}
          ></span>
        </div>
      </div>
      <ul className={styles.list}>
        <li className="rx">{formatTraffic(rx)}</li>
        <li className="tx">{formatTraffic(tx)}</li>
        <li>{formatTraffic((rx + tx))}</li>
      </ul>
    </div>
  );
};

export default Chart;

export interface ChartProps {
  type: string
  title: string
  rx: number
  tx: number
}
