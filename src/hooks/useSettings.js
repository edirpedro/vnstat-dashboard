import React from "react";
import { AppContext } from "../AppContext";
import useLocalStorage from "./useLocalStorage";

export const SettingsHook = () => {
  const [ifaces, setIfaces] = React.useState();
  const [settings, setSettings] = useLocalStorage("settings", {
    units: "IEC",
    interface: "",
    theme: {},
		reports_initial: "day",
		chart_initial: "fiveminute",
    chart_fiveminute_log: true,
    chart_fiveminute_type: "area",
    chart_hour_log: true,
    chart_hour_type: "area",
    chart_day_log: true,
    chart_day_type: "area",
    chart_month_log: false,
    chart_month_type: "area",
    chart_year_log: false,
    chart_year_type: "area",
  });

  // Globals

  window.vnStat_SETTINGS = settings;

  // Load interfaces

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "?dbiflist")
      .then((response) => response.json())
      .then((json) => {
        if (json.message) throw new Error(json.message);

        // Validate current interface

        let iface = settings.interface.split("+");
        const exists = json.interfaces.filter((el) => iface.includes(el.name));
        if (exists.length) iface = exists.map((el) => el.name).join("+");
        else iface = json.interfaces.at(0).name;

        // Save

        if (iface !== settings.interface)
          setSettings((prev) => ({ ...prev, interface: iface }));
        setIfaces(json.interfaces);
      })
      .catch(console.error);

    // eslint-disable-next-line
  }, []);

  return { ifaces, settings, setSettings };
};

const useSettings = () => {
  const { Settings } = React.useContext(AppContext);
  return { ...Settings };
};

export default useSettings;
