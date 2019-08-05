import { useState, useEffect } from "react";

function useLocalStorageItem(key) {
  const [itemValue, setItemValue] = useState(null);

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (!value) {
      return;
    }
    if (value === "true" || value === "false") {
      setItemValue(value === "true");
      return;
    }
    setItemValue(value);
  }, [key]);

  const setItem = value => {
    if (value !== undefined) {
      localStorage.setItem(key, value);
      setItemValue(value);
    }
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setItemValue(null);
  };

  return [itemValue, setItem, removeItem];
}

export default useLocalStorageItem;
