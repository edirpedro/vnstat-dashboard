import React from "react";
import { AppContext } from "../AppContext";

export const ThemesHook = (Settings) => {
  const { settings, setSettings } = Settings;
  const [themes, setThemes] = React.useState();
  const [theme, setTheme] = React.useState();

  // Get all themes

  React.useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/api/themes.json")
      .then((response) => response.json())
      .then((json) => {
        if (json.message) throw new Error(json.message);
        setThemes(json);
      })
      .catch(console.error);
  }, []);

  // Setup theme

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

  if (themes && !theme) {
    const pick = themes.at(0);
		const chosen = themes.find((el) => el.file === settings.theme.file);
    changeTheme(chosen ?? pick);
	}

  function changeTheme(option) {
    setSettings((prev) => ({ ...prev, theme: option }));
    setTheme(option);
  }

  return { theme, themes, changeTheme };
};

const useThemes = () => {
  const { Themes } = React.useContext(AppContext);
  return { ...Themes };
};

export default useThemes;
