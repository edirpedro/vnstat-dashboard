import React from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = React.useState(() => {
    let current;
    try {
      current = JSON.parse(localStorage.getItem(key));
      current = { ...defaultValue, ...current };
    } catch (e) {
      current = defaultValue;
    }
    return current;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
