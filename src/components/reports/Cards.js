import React from "react";
import { DateTime } from "luxon";
import Card from "./Card";

const Cards = ({ type, traffic }) => {
  const ref = React.useRef();
  const rx = traffic.map((el) => el.rx);
  const tx = traffic.map((el) => el.tx);
  const max = Math.max(...rx, ...tx);

  // Scroll list to top on every change

  React.useEffect(() => ref.current.scrollTo(0, 0));

  // Get subtitles according to the report type

  function theSubtitle(item) {
    const date = DateTime.fromObject({ ...item.date, ...item.time });
    switch (type) {
      case "fiveminute":
      case "hour":
        return date.toLocaleString(DateTime.DATE_MED);
      case "day":
        return date.monthLong;
      case "month":
        return date.year;
      default:
        return false;
    }
  }

  // Map data with subtitles to indicate the date range

  let map = traffic.slice();
  let data = [];
  let subtitle;

  if (type === "top") map = map.slice(0, 10);
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
    <div className={"reports__cards is-" + type}>
      <ul ref={ref}>
        {data.map((item, index) =>
          item.subtitle ? (
            <li
              key={Math.random()}
              className="subtitle"
              style={{ "--order": index }}
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
