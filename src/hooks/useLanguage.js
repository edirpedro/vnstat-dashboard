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

  function __(text) {
    return translations[text] ?? text;
  }

  return { __ };
};

export default useLanguage;
