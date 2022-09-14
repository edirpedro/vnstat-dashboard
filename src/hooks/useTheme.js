import React from "react";

const useTheme = () => {
  let themes = [
		{ title: "Dark Green", file: "/static/themes/dark-green.css" },
    { title: "Light Gren", file: "/static/themes/light-green.css" },
    { title: "Night City", file: "/static/themes/night-city.css" },
    { title: "Cyberpunk", file: "/static/themes/cyberpunk-2077.css" },
		{ title: "The Division", file: "/static/themes/the-division.css" },
		{ title: "Gradients", file: "/static/themes/gradients.css" },
		{ title: "Tunnel", file: "/static/themes/tunnel.css", video: "/static/media/tunnelmotions-27438.mp4" },
  ];
  if (window.vnStat.themes) themes = [...themes, ...window.vnStat.themes];

  const [theme, setTheme] = React.useState(() => {
    const current = window.localStorage.getItem("theme");
    const pick = themes.at(0);
    const chosen = themes.find((el) => el.file === current);
    return chosen ? chosen : pick;
  });

  React.useEffect(() => {
		let link = document.head.querySelector("#theme");
    if (link) link.remove();
    link = document.createElement("link");
    link.setAttribute("id", "theme");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", theme.file);
    document.head.append(link);
    window.localStorage.setItem("theme", theme.file);
  }, [theme]);

  return { theme, themes, setTheme };
};

export default useTheme;
