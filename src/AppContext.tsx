import React from "react";
import { LanguagesHook, ILanguages } from "hooks/useLanguages";
import { ReportsHook, IReports } from "hooks/useReports";
import { SettingsHook, ISettings } from "hooks/useSettings";
import { ThemesHook, IThemes } from "hooks/useThemes";

export const AppContext = React.createContext<AppContextProps>(undefined!);

const AppProvider = ({ children }: AppProviderProps) => {
  
  // Loading essential data sequentially

  const Settings = SettingsHook();
  const Languages = LanguagesHook(Settings.ready);
  const Themes = ThemesHook(Languages.ready, Settings);
  const Reports = ReportsHook(Themes.ready, Settings);

  return (
    <AppContext.Provider
      value={{
        Settings,
        Languages,
        Themes,
        Reports,
      }}
    >
      {Reports.ready && children}
    </AppContext.Provider>
  );
};

export default AppProvider;

type AppContextProps = {
  Languages: ILanguages.Props
  Themes: IThemes.Props
  Reports: IReports.Props
  Settings: ISettings.Props
}

type AppProviderProps = {
  children: React.ReactNode
}
