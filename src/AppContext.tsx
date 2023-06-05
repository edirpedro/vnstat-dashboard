import React from "react";
import { LanguagesProvider } from "hooks/useLanguages";
import { ReportsProvider } from "hooks/useReports";
import { SettingsProvider } from "hooks/useSettings";
import { ThemesProvider } from "hooks/useThemes";

const AppProviders = ({ children }: Provider) => {
  return (
    <SettingsProvider>
      <LanguagesProvider>
        <ThemesProvider>
          <ReportsProvider>{children}</ReportsProvider>
        </ThemesProvider>
      </LanguagesProvider>
    </SettingsProvider>
  );
};

export default AppProviders;

type Provider = {
  children: React.ReactNode;
};
