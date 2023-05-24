import React from "react";
import { AppContext } from "AppContext";
import { ISettings } from "./useSettings";

export const ThemesHook = (load: boolean = true, Settings: ISettings.Props): IThemes.Props => {
  const { settings, setSettings } = Settings;
  const [ready, setReady] = React.useState(false);
  const [themes, setThemes] = React.useState<IThemes.Theme[]>([]);
  const [theme, setTheme] = React.useState<IThemes.Theme>();

  // Fetch essential data, used at AppContext

  React.useEffect(() => {
    if (!load) return;
    (async function load() {
      await fetch(process.env.PUBLIC_URL + "/api/themes.json")
        .then((response) => response.json())
        .then((json) => {
          if (json.message) throw new Error(json.message);
          setThemes(json);
          setReady(true);
        })
        .catch(console.error);
    })();
    // eslint-disable-next-line
  }, [load]);

  // Setup theme

  React.useEffect(() => {
    if (!themes.length) return;
    const pick = themes.at(0) as IThemes.Theme;
		const chosen = themes.find((el) => el.file === settings.theme?.file) as IThemes.Theme;
    changeTheme(chosen ?? pick);
    // eslint-disable-next-line
  }, [themes]);

  React.useEffect(() => {
    if (!theme) return;
    let link = document.head.querySelector("#theme");
    if (link) link.remove();
    link = document.createElement("link");
    link.setAttribute("id", "theme");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", process.env.PUBLIC_URL + theme.file);
    document.head.append(link);
  }, [theme]);

  // Change theme

  function changeTheme(option: IThemes.Theme) {
    setSettings((prev) => ({ ...prev, theme: option }));
    setTheme(option);
  }

  return { ready, theme, themes, changeTheme };
};

const useThemes = () => {
  const { Themes } = React.useContext(AppContext);
  return { ...Themes };
};

export default useThemes;

export namespace IThemes {
  
  export interface Props {
    ready: boolean
    theme: Theme | undefined
    themes: Theme[]
    changeTheme: (options: Theme) => void
  }

  export interface Theme {
    title: string
    file: string
  }
  
}

