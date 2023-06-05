import { DateTime } from "luxon";
import { IvnStat } from "services/vnstat.type";
import styles from "./Cards.module.scss";

const Card = ({ type, item, index, max }: Props) => {
  function theTitle(): string {
    const date = DateTime.fromObject({ ...item.date, ...item.time });
    switch (type) {
      case "fiveminute":
      case "hour":
        return date.toLocaleString(DateTime.TIME_SIMPLE);
      case "day":
        return date.day.toString();
      case "month":
        return date.monthLong ?? "";
      case "year":
        return date.year.toString();
      case "top":
        return date.toLocaleString(DateTime.DATE_SHORT);
      default:
        return "";
    }
  }

  return (
    <li style={{ "--order": index } as React.CSSProperties}>
      <div className={styles.colName}>
        {type === "top" ? (
          <strong>{(index + 1).toString().padStart(2, "0")}</strong>
        ) : null}
        {theTitle()}
      </div>
      <div className={styles.colChart}>
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
      <div className={styles.colRx}>{item.rx_formatted}</div>
      <div className={styles.colTx}>{item.tx_formatted}</div>
      <div className={styles.colTotal}>{item.total_formatted}</div>
      <div className={styles.colRate}>{item.rate_formatted}</div>
    </li>
  );
};

export default Card;

type Props = {
  type: IvnStat.TrafficKeys;
  item: IvnStat.Traffic;
  index: number;
  max: number;
};
