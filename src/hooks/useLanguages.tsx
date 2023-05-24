import React from "react";
import { DateTime } from "luxon";
import { AppContext } from "AppContext";

export const LanguagesHook = (load: boolean = true): ILanguages.Props => {
  const [ready, setReady] = React.useState(false);
  const [translations, setTranslations] = React.useState<Translations>({});

  // Fetch essential data, used at AppContext
  
  React.useEffect(() => {
    if (!load) return;
    (async function load() {
      const local = DateTime.local();
      await fetch(process.env.PUBLIC_URL + "/languages/" + local.locale + ".json")
        .then((response) => response.json())
        .then((json) => {
          setTranslations(json);
        })
        .catch((e) => {
          console.log("Language file for '" + local.locale + "' was not found.");
          setTranslations({});
        });
      setReady(true);
    })();
    // eslint-disable-next-line
  }, [load]);

  /**
   * Translate texts using the loaded JSON
   * __("Text to translate")
   * __("Text with %s", "replaced strings") Use %s to point as many strings as you need.
   * @returns {string}
   */
  function __(...args: string[]): string {
    const text: string = args[0];
    let translation = translations[text] ?? text;
    if (args.length > 1) {
      for (let i = 1; i < args.length; i++)
        translation = translation.replace("%s", args[i]);
    }
    return translation;
  }

  return { ready, translations, __ };
};

const useLanguages = () => {
  const { Languages } = React.useContext(AppContext);
  return { ...Languages };
};

export default useLanguages;

export namespace ILanguages {

  export interface Props {
    ready: boolean
    translations: Translations
    __: (...args: string[]) => string
  }

}

type Translations = {
  [key: string]: string
}
