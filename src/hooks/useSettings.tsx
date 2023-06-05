import React from "react";
import { ITheme } from "./useThemes";
import useLocalStorage from "./useLocalStorage";

const SettingsContext = React.createContext<Context>(undefined!);

export const SettingsProvider = ({ children }: Provider) => {
  const [ready, setReady] = React.useState(false);
  const [ifaces, setIfaces] = React.useState<ISettings.Iface[]>();
  const [settings, setSettings] = useLocalStorage<ISettings.Options>(
    "settings",
    {
      units: "IEC",
      interface: "",
      reports_initial: "day",
      chart_initial: "fiveminute",
      chart_fiveminute_log: true,
      chart_fiveminute_type: "area",
      chart_hour_log: true,
      chart_hour_type: "area",
      chart_day_log: true,
      chart_day_type: "area",
      chart_month_log: false,
      chart_month_type: "area",
      chart_year_log: false,
      chart_year_type: "area",
    }
  );

  // Fetch essential data

  React.useEffect(() => {
    (async function load() {
      await fetch(process.env.REACT_APP_API_URL + "?dbiflist")
        .then((response) => response.json())
        .then((json) => {
          if (json.message) throw new Error(json.message);

          // Validate current interface

          let iface: string;
          let test: string[] = settings.interface.split("+");
          const exists = json.interfaces.filter((el: any) =>
            test.includes(el.name)
          );
          if (exists.length) iface = exists.map((el: any) => el.name).join("+");
          else iface = json.interfaces.at(0).name;

          // Save

          if (iface !== settings.interface)
            setSettings((prev) => ({ ...prev, interface: iface }));
          setIfaces(json.interfaces);
          setReady(true);
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    })();
    // eslint-disable-next-line
  }, []);

  if (!ready) return null; // Wait before going to the next provider

  return (
    <SettingsContext.Provider value={{ ifaces, settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => React.useContext(SettingsContext);

export default useSettings;

export namespace ISettings {
  export interface Options {
    units: "IEC" | "JEDEC" | "SI";
    interface: string;
    theme?: ITheme;
    reports_initial: "fiveminute" | "hour" | "day" | "month" | "year";
    chart_initial: "fiveminute" | "hour" | "day" | "month" | "year";
    chart_fiveminute_log: boolean;
    chart_fiveminute_type: "area" | "bar";
    chart_hour_log: boolean;
    chart_hour_type: "area" | "bar";
    chart_day_log: boolean;
    chart_day_type: "area" | "bar";
    chart_month_log: boolean;
    chart_month_type: "area" | "bar";
    chart_year_log: boolean;
    chart_year_type: "area" | "bar";
  }

  export interface Iface {
    name: string;
    alias: string;
  }
}

type Context = {
  ifaces: ISettings.Iface[] | undefined;
  settings: ISettings.Options;
  setSettings: React.Dispatch<React.SetStateAction<ISettings.Options>>;
};

type Provider = {
  children: React.ReactNode;
};
