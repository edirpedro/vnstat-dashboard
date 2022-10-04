import React from "react";
import { DateTime } from "luxon";
import { AppContext } from "../AppContext";

export const LanguagesHook = () => {
  const [translations, setTranslations] = React.useState();

  React.useEffect(() => {
    const local = DateTime.local();
    fetch(process.env.PUBLIC_URL + "/languages/" + local.locale + ".json")
      .then((response) => response.json())
      .then((json) => {
        setTranslations(json);
      })
      .catch((e) => {
        console.log("Language file for '" + local.locale + "' was not found.");
        setTranslations({});
      });
  }, []);

  /**
   * Translate texts using the loaded JSON
   * __("Text to translate")
   * __("Text with %s", "replaced strings") Use %s to point as many strings as you need.
   * @returns {string}
   */
  function __() {
    const text = arguments[0];
    let translation = translations[text] ?? text;
    if (arguments.length > 1) {
      for (let i = 1; i < arguments.length; i++)
        translation = translation.replace("%s", arguments[i]);
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: translation,
          }}
        />
      );
    }
    return translation;
  }

  return { translations, __ };
};

const useLanguages = () => {
  const { Languages } = React.useContext(AppContext);
  return { ...Languages };
};

export default useLanguages;
