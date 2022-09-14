import React from "react";
import useLanguage from "./hooks/useLanguage.js";
import useReports from "./hooks/useReports.js";
import useTheme from "./hooks/useTheme.js";

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { __ } = useLanguage();
	const { theme, themes, setTheme } = useTheme();
	const { reports, changeReports } = useReports();
  
	if (!reports) return null;
	
  return (
    <AppContext.Provider
      value={{
        reports,
        changeReports,
        theme,
				themes,
        setTheme,
				__
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
