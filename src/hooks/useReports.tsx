import React from "react";
import useSettings from "./useSettings";
import Reports from "services/reports";
import useHelpers from "./useHelpers";
import vnStat from "services/vnstat";

const ReportsContext = React.createContext<Context>(undefined!);

export const ReportsProvider = ({ children }: Provider) => {
  const [ready, setReady] = React.useState(false);
  const [json, setJSON] = React.useState<vnStat>(undefined!);
  const [reports, setReports] = React.useState<Reports>(Object.create(null));

  const { settings, setSettings } = useSettings();
  const { getUnit } = useHelpers();

  // Load JSON

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`)
      .then((response) => response.json())
      .then((json) => {
        setJSON(new vnStat(json));
      })
      .catch(console.error);
  }, []);

  // [json] Load first reports
  // [settings.units] Update traffic formats when settings units change

  React.useEffect(() => {
    if (json) changeReports(settings.interface);
    // eslint-disable-next-line
  }, [json, settings.units]);

  // Change reports

  function changeReports(iface: string) {
    const unit = getUnit(settings.units);
    setReports(json.getReports(iface, unit));
    setSettings((prev) => ({ ...prev, interface: iface }));
    setReady(true);
  }

  if (!ready) return null; // Wait before going to the next provider

  return (
    <ReportsContext.Provider value={{ json, reports, changeReports }}>
      {children}
    </ReportsContext.Provider>
  );
};

const useReports = () => React.useContext(ReportsContext);

export default useReports;

type Context = {
  json: vnStat;
  reports: Reports;
  changeReports: (iface: string) => void;
};

type Provider = {
  children: React.ReactNode;
};
