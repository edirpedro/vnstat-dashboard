import React from "react";
import useLanguages from "hooks/useLanguages";
import useThemes from "hooks/useThemes";
import styles from "./Themes.module.scss";

const Themes = () => {
  const { __ } = useLanguages();
  const { theme, themes, changeTheme } = useThemes();

  return (
    <div id="themes" className={styles.themes}>
      <div className={styles.box}>
        <h2>{__("Themes")}</h2>
        {themes.map((item, index) => (
          <button
            key={index}
            onClick={() => changeTheme(item)}
            className={item.file === theme?.file ? "active" : undefined}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Themes;
