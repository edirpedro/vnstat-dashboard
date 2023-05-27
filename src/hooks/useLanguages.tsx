import React from "react";
import { DateTime } from "luxon";

const LanguagesContext = React.createContext<Context>(undefined!);

export const LanguagesProvider = ({ children }: Provider) => {
  const [ready, setReady] = React.useState(false);
  const [translations, setTranslations] = React.useState<Translations>({});

  // Load translations

  React.useEffect(() => {
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
  }, []);

  /**
   * Translate texts using the loaded JSON
   * __("Text to translate")
   * __("Text with %s", "replaced strings") Use %s to point as many strings as you need.
   * @returns {string}
   */
  function __(...args: string[]): string {
    const text: string = args[0];
    let translation = text;
    if (translations && text in translations)
      translation = translations[text];
    if (args.length > 1) {
      for (let i = 1; i < args.length; i++)
        translation = translation.replace("%s", args[i]);
    }
    return translation;
  }

  if (!ready) return null; // Wait before going to the next provider

  return (
    <LanguagesContext.Provider value={{ translations, __ }}>
      {children}
    </LanguagesContext.Provider>
  );
};

const useLanguages = () => React.useContext(LanguagesContext);

export default useLanguages;

type Context = {
  translations: Translations
  __: (...args: string[]) => string
}

type Provider = {
  children: React.ReactNode
}

type Translations = {
  [key: string]: string
}
