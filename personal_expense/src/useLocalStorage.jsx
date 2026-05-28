import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    const initalValue = JSON.parse(saved);
    return initalValue ? initalValue : initialState;
  });
  useEffect(
    function () {
      // console.log("Effect runs");
      const string = JSON.stringify(value);
      localStorage.setItem(key, string);
    },
    [value, key],
  );
  return [value, setValue];
}
