import React from "react";
import { AppContext } from "../../AppContext";
import { getConfig } from "../../services/helpers";
import About from "../about/About";
import Widget from "../widget/Widget";
import "./Menu.css";

const Menu = ({ column, row }) => {
  const { reports, changeReports, __ } = React.useContext(AppContext);
  const [about, modalAbout] = React.useState();

  const iface = reports.getInterface();
  const options = getConfig("interfaces");
  const current = options.find((el) => el.name === iface);
  const title = current.title ?? current.name;

  return (
    <>
      <Widget column={column} row={row} className="menu">
        <div className="menu__box">
          <div className="menu__title">{title}</div>
          <div className="menu__list">
            {options.length > 1 && options.map((item) => (
              <button
                key={item.name}
                onClick={() => changeReports(item.name)}
                className={item.name === iface ? "active" : null}
              >
                {item.title ?? item.name}
              </button>
            ))}
            <hr />
            <button key="about" onClick={() => modalAbout(true)}>
              {__("About")}
            </button>
          </div>
        </div>
      </Widget>
      {about && <About modalAbout={modalAbout} />}
    </>
  );
};

export default Menu;
