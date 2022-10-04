import React from "react";
import { AppContext } from "../AppContext";
import vnStat from "../services/vnstat";

export const ReportsHook = (Settings) => {
  const { ifaces, settings, setSettings } = Settings;
  const [reports, setReports] = React.useState();

  // First load

  React.useEffect(() => {
    if (!ifaces || settings.interface === "") return;
    changeReports(settings.interface);
    // eslint-disable-next-line
  }, [ifaces]);

  // Change reports

  function changeReports(iface) {
    const url = process.env.REACT_APP_API_URL;
    fetch(url + "?interface=" + iface)
      .then((response) => response.json())
      .then((json) => {
        if (json.message) throw new Error(json.message);
        setReports(new vnStat(json));
        setSettings((prev) => ({ ...prev, interface: iface }));
      })
      .catch(console.error);
  }

  return { reports, changeReports };
};

const useReports = () => {
  const { Reports } = React.useContext(AppContext);
  return { ...Reports };
};

export default useReports;
