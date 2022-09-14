import React from "react";
import { AppContext } from "../../AppContext";
import "./Themes.css"

const Themes = () => {
  const { theme, themes, setTheme, __ } = React.useContext(AppContext);

  return (
    <div id="themes">
      <div className="box">
        <h2>{__("Themes")}</h2>
        {themes.map((item, index) => (
          <button
            key={index}
            onClick={() => setTheme(item)}
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
