import React from "react";
import { getConfig } from "../services/helpers";
import vnStat from "../services/vnstat";

const useReports = () => {
  const [reports, setReports] = React.useState();

  function changeReports(iface) {
    async function request() {
      try {
        const url = getConfig("api");
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
		const options = getConfig("interfaces");
    changeReports(options.at(0).name);
  }, []);

  return { reports, changeReports };
};

export default useReports;
