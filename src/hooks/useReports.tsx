import React from "react";
import useSettings from "./useSettings";
import vnStat from "services/vnstat";
import useHelpers from "./useHelpers";

const ReportsContext = React.createContext<Context>(undefined!);

export const ReportsProvider = ({ children }: Provider) => {
  const [ready, setReady] = React.useState(false);
  const [reports, setReports] = React.useState<vnStat>(Object.create(null));

  const { settings, setSettings } = useSettings();
  const { getUnit } = useHelpers();

  // Load first reports

  React.useEffect(() => {
    (async function load() {
      await changeReports(settings.interface);
    })();
    // eslint-disable-next-line
  }, []);

  // Change reports

  async function changeReports(iface: string) {
    const url = process.env.REACT_APP_API_URL;
    await fetch(url + "?interface=" + iface)
      .then((response) => response.json())
      .then((json) => {
        if (json.message) throw new Error(json.message);
        setReports(new vnStat(json, getUnit()));
        setSettings((prev) => ({ ...prev, interface: iface }));
        setReady(true);
      })
      .catch(console.error);
  }

  if (!ready) return null; // Wait before going to the next provider

  return (
    <ReportsContext.Provider value={{ reports, changeReports }}>
      {children}
    </ReportsContext.Provider>
  );
};

const useReports = () => React.useContext(ReportsContext);

export default useReports;

type Context = {
  reports: vnStat;
  changeReports: (iface: string) => Promise<void>;
};

type Provider = {
  children: React.ReactNode;
};
