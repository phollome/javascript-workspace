import { useState, useEffect } from "react";

function useLocalStorageItem(key) {
  const [itemValue, setItemValue] = useState();
  useEffect(() => {
    setItemValue(localStorage.getItem(key));
  });

  const setItem = value => {
    localStorage.setItem(key, value);
    setItemValue(value);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setItemValue(null);
  };

  return [itemValue, setItem, removeItem];
}

export default useLocalStorageItem;