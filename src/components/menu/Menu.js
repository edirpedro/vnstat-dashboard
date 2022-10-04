import React from "react";
import useLanguages from "../../hooks/useLanguages";
import useModal from "../../hooks/useModal";
import useReports from "../../hooks/useReports";
import useSettings from "../../hooks/useSettings";
import About from "../about/About";
import Settings from "../settings/Settings";
import Widget from "../widget/Widget";
import MenuInterface from "./MenuInterface";
import "./Menu.scss";

const Menu = ({ column, row }) => {
  const { __ } = useLanguages();
  const { reports, changeReports } = useReports();
  const { ifaces } = useSettings();

  const [ModalAbout, openAbout] = useModal(About, { name: "about" });
  const [ModalSettings, openSettings] = useModal(Settings, { name: "settings" });

  let iface = reports.getInterface();
  iface = iface.split("+");

  const current = ifaces.filter((el) => iface.includes(el.name));
  const title = current[0].alias ?? current[0].name;

  return (
    <>
      <Widget column={column} row={row} className="menu">
        <div className="menu__box">
          <div className="menu__title">
            {title}
            {current.length > 1 && <span>+</span>}
          </div>
          <ul className="menu__list">
            {ifaces.length > 1 &&
              ifaces.map((item, index) => (
                <MenuInterface
									key={index}
                  iface={iface}
                  item={item}
                  changeReports={changeReports}
                />
              ))}
            <li className="separator"></li>
            <li>
              <button onClick={() => openSettings()}>{__("Settings")}</button>
            </li>
            <li>
              <button onClick={() => openAbout()}>{__("About")}</button>
            </li>
          </ul>
        </div>
      </Widget>
			{ModalAbout}
			{ModalSettings}
    </>
  );
};

export default Menu;
