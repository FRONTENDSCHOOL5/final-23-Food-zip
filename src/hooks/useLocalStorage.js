import { useState, useEffect } from "react";
import { tokenValid } from "../api/auth";

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      // console.log(key, value);
      if (value) {
        return value;
      } else {
        localStorage.setItem(key, defaultValue);
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (key === "token" && storedValue) {
      tokenValid(storedValue).then(result => {
        // console.log("Token valid:", result);
      });
    }
  }, [storedValue, key]);

  const setValue = newValue => {
    try {
      localStorage.setItem(key, newValue);
      setStoredValue(newValue);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
