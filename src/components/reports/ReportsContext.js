import React from "react";
import { AppContext } from "../../AppContext";

export const ReportsContext = React.createContext();

const ReportsProvider = ({ children }) => {
  const { reports } = React.useContext(AppContext);
  const [tab, setTab] = React.useState();
  const current = reports.getInterface();
  const iface = React.useRef(current);

	// Reset tabs after change reports
  if (current !== iface.current) {
    iface.current = current;
    setTab();
  }

  return (
    <ReportsContext.Provider value={{ tab, setTab }}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsProvider;
