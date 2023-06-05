import useLanguages from "hooks/useLanguages";
import useModal from "hooks/useModal";
import useReports from "hooks/useReports";
import useSettings from "hooks/useSettings";
import About from "../about/About";
import Settings from "../settings/Settings";
import Widget, { IWidget } from "../widget/Widget";
import MenuInterface from "./MenuInterface";
import styles from "./Menu.module.scss";

const Menu = ({ column, row }: IWidget.ColRow) => {
  const { __ } = useLanguages();
  const { reports } = useReports();
  const { ifaces } = useSettings();

  const [ModalAbout, openAbout] = useModal(About, { name: "about" });
  const [ModalSettings, openSettings] = useModal(Settings, {
    name: "settings",
  });

  let iface: string[] = [reports.getInterface()];
  if (iface[0].indexOf("+")) iface = iface[0].split("+");

  if (!ifaces) return null;

  const current = ifaces.filter((el) => iface.includes(el.name));
  const title = current[0].alias ?? current[0].name;

  return (
    <>
      <Widget column={column} row={row} className={styles.menu}>
        <div className={styles.box}>
          <div className={styles.title}>
            {title}
            {current.length > 1 && <span>+</span>}
          </div>
          <ul className={styles.list}>
            {ifaces.length > 1 &&
              ifaces.map((item, index) => (
                <MenuInterface key={index} iface={iface} item={item} />
              ))}
            <li className="divider"></li>
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
