import React from "react";
import vnStat from "../services/vnstat";

const useReports = () => {
  const [reports, setReports] = React.useState();

  function changeReports(iface) {
    async function request() {
      try {
        const url = window.vnStat.api;
        const response = await fetch(url + "?interface=" + iface);
        const json = await response.json();
        if (!response.ok) throw new Error(json.message);
        setReports(new vnStat(json));
      } catch (e) {
        console.error(e.message);
      }
    }
    request();
  }

  React.useEffect(() => {
    changeReports(window.vnStat.interfaces.at(0).name);
  }, []);

  return { reports, changeReports };
};

export default useReports;
