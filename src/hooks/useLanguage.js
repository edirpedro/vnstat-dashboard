import React from "react";
import { DateTime } from "luxon";

const useLanguage = () => {
  const [translations, setTranslations] = React.useState({});

  React.useEffect(() => {
    const local = DateTime.local();
    async function request() {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + "/languages/" + local.locale + ".json"
        );
        const json = await response.json();
        if (!response.ok) throw new Error();
        setTranslations(json);
      } catch (e) {
        console.log("Language file for '" + local.locale + "' was not found.");
      }
    }
    request();
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

  return { __ };
};

export default useLanguage;
