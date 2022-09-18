import React from "react";
import { AppContext } from "../../AppContext";
import { getConfig } from "../../services/helpers";
import Widget from "../widget/Widget";
import "./Menu.css";

const Menu = ({ column, row }) => {
  const { reports, changeReports } = React.useContext(AppContext);
	const iface = reports.getInterface();
  const options = getConfig("interfaces");
  const current = options.find((el) => el.name === iface);
  const title = current.title ?? current.name;

  return (
    <Widget column={column} row={row} className="menu">
      <div className="menu__box">
        <div className="menu__title">{title}</div>
        {options.length > 1 ? (
          <div className="menu__list">
            {options.map((item) => (
              <button
                key={item.name}
                onClick={() => changeReports(item.name)}
                className={item.name === iface ? "active" : null}
              >
                {item.title ?? item.name}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </Widget>
  );
};

export default Menu;
