import React from "react";
import { LanguagesHook } from "./hooks/useLanguages.js";
import { ReportsHook } from "./hooks/useReports.js";
import { SettingsHook } from "./hooks/useSettings.js";
import { ThemesHook } from "./hooks/useThemes.js";

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const Settings = SettingsHook();
  const Languages = LanguagesHook();
  const Themes = ThemesHook(Settings);
  const Reports = ReportsHook(Settings);

  function isReady() {
		// Wait all asynchronous
    if (!Settings.ifaces) return false;
		if (!Languages.translations) return false;
    if (!Themes.theme) return false;
    if (!Reports.reports) return false;
    return true;
  }

  if (!isReady()) return null;

  return (
    <AppContext.Provider
      value={{
        Languages,
        Themes,
        Reports,
        Settings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
