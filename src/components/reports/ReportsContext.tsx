import React from "react";
import useReports from "hooks/useReports";
import { IvnStat } from "services/vnstat.type";

export const ReportsContext = React.createContext<ContextProps>(undefined!);

const ReportsProvider = ({ children }: ProviderProps) => {
  const { reports } = useReports();
  const [tab, setTab] = React.useState<IvnStat.TrafficKeys>();
  const current = reports.getInterface();
  const iface = React.useRef<string>(current);

  // Reset tabs after change reports
  if (current !== iface.current) {
    iface.current = current;
    setTab(undefined);
  }

  return (
    <ReportsContext.Provider value={{ tab, setTab }}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsProvider;

export type ReportsContextTab = IvnStat.TrafficKeys | undefined;

type ContextProps = {
  tab: ReportsContextTab;
  setTab: React.Dispatch<React.SetStateAction<ReportsContextTab>>;
};

type ProviderProps = {
  children: React.ReactNode;
};
