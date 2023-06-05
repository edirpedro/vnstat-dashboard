import React from "react";

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = React.useState<T>((): T => {
    let current;
    try {
      current = JSON.parse(localStorage.getItem(key) || "");
      current = { ...defaultValue, ...current };
    } catch (e) {
      current = defaultValue;
    }
    return current as T;
  });

  // Autosave

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const; // avoid Typescript infer an union type
}

export default useLocalStorage;
