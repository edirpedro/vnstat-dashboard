import React from "react";
import { DateTime } from "luxon";
import Card from "./Card";
import { IvnStat } from "services/vnstat.type";
import styles from "./Cards.module.scss";

const Cards = ({ type, traffic }: Props) => {
  const ref = React.useRef<HTMLUListElement>(null);
  const rx = traffic.map((el) => el.rx);
  const tx = traffic.map((el) => el.tx);
  const max = Math.max(...rx, ...tx);

  // Scroll list to top on every change

  React.useEffect(() => ref.current?.scrollTo(0, 0));

  // Get subtitles according to the report type

  function theSubtitle(item: IvnStat.Traffic): string {
    const date = DateTime.fromObject({ ...item.date, ...item.time });
    switch (type) {
      case "fiveminute":
      case "hour":
        return date.toLocaleString(DateTime.DATE_MED);
      case "day":
        return date.monthLong ?? "";
      case "month":
        return date.year.toString();
      default:
        return "";
    }
  }

  // Map data with subtitles to indicate the date range

  let map = traffic.slice();
  let data: any[] = [];
  let subtitle: string;

  if (type === "top") map = map.slice(0, 20);
  else map.reverse();

  map.forEach((item) => {
    let text = theSubtitle(item);
    if (text && text !== subtitle) {
      data.push({ subtitle: text });
      subtitle = text;
    }
    data.push(item);
  });

  return (
    <div className={styles.cards + " is-" + type}>
      <ul ref={ref}>
        {data.map((item, index) =>
          "subtitle" in item ? (
            <li
              key={Math.random()}
              className={styles.subtitle}
              style={{ "--order": index } as React.CSSProperties}
            >
              {item.subtitle}
            </li>
          ) : (
            <Card
              key={Math.random()}
              type={type}
              item={item}
              index={index}
              max={max}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default Cards;

type Props = {
  type: IvnStat.TrafficKeys;
  traffic: IvnStat.Traffic[];
};
