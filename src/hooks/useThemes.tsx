import React from "react";
import useSettings from "./useSettings";

const ThemesContext = React.createContext<Context>(undefined!);

export const ThemesProvider = ({ children }: Provider) => {
  const [ready, setReady] = React.useState(false);
  const [themes, setThemes] = React.useState<ITheme[]>([]);
  const [theme, setTheme] = React.useState<ITheme>();

  const { settings, setSettings } = useSettings();

  // Load themes

  React.useEffect(() => {
    (async function load() {
      await fetch(process.env.PUBLIC_URL + "/api/themes.json")
        .then((response) => response.json())
        .then((json) => {
          if (json.message) throw new Error(json.message);
          setThemes(json);
        })
        .catch(console.error);
    })();
    // eslint-disable-next-line
  }, []);

  // Setup theme

  React.useEffect(() => {
    if (!themes.length) return;
    const pick = themes.at(0) as ITheme;
    const chosen = themes.find(
      (el) => el.file === settings.theme?.file
    ) as ITheme;
    changeTheme(chosen ?? pick);
    setReady(true);
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

  function changeTheme(option: ITheme) {
    setSettings((prev) => ({ ...prev, theme: option }));
    setTheme(option);
  }

  if (!ready) return null; // Wait before going to the next provider

  return (
    <ThemesContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

const useThemes = () => React.useContext(ThemesContext);

export default useThemes;

export interface ITheme {
  title: string;
  file: string;
}

type Context = {
  theme: ITheme | undefined;
  themes: ITheme[];
  changeTheme: (options: ITheme) => void;
};

type Provider = {
  children: React.ReactNode;
};
