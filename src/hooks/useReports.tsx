import React from "react";
import { AppContext } from "AppContext";
import { ISettings } from "./useSettings";
import vnStat from "services/vnstat";


export const ReportsHook = (load: boolean = true, Settings: ISettings.Props): IReports.Props => {
  const { settings, setSettings } = Settings;
  const [ready, setReady] = React.useState(false);
  const [reports, setReports] = React.useState<vnStat>(Object.create(null));

  // Fetch essential data, used at AppContext

  React.useEffect(() => {
    if (!load) return;
    (async function load() {
      await changeReports(settings.interface);
    })();
    // eslint-disable-next-line
  }, [load]);

  // Change reports

  async function changeReports(iface: string) {
    const url = process.env.REACT_APP_API_URL;
    await fetch(url + "?interface=" + iface)
      .then((response) => response.json())
      .then((json) => {
        if (json.message) throw new Error(json.message);
        setReports(new vnStat(json));
        setSettings((prev) => ({ ...prev, interface: iface }));
        setReady(true);
      })
      .catch(console.error);
  }

  return { ready, reports, changeReports };
};

const useReports = () => {
  const { Reports } = React.useContext(AppContext);
  return { ...Reports };
};

export default useReports;

export namespace IReports {

  export interface Props {
    ready: boolean
    reports: vnStat
    changeReports: (iface: string) => Promise<void>
  }

}
