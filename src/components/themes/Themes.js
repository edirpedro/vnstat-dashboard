import React from "react";
import useLanguages from "../../hooks/useLanguages";
import useThemes from "../../hooks/useThemes";
import "./Themes.scss"

const Themes = () => {
	const { __ } = useLanguages();
  const { theme, themes, changeTheme } = useThemes();

  return (
    <div id="themes">
      <div className="box">
        <h2>{__("Themes")}</h2>
        {themes.map((item, index) => (
          <button
            key={index}
            onClick={() => changeTheme(item)}
            className={item.file === theme.file ? "active" : null}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Themes;
