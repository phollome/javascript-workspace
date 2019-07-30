import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorageItem } from "@phollome/hooks";

const Context = createContext();

function Provider(props) {
  const [storedKey, setStoredKey, removeStoredKey] = useLocalStorageItem("key");
  const [localKey, setLocalKey] = useState();
  const [storeKey = false, setStoreKey] = useLocalStorageItem("storeKey");

  useEffect(() => {
    if (storeKey && localKey !== storedKey) {
      setStoredKey(localKey);
    }
  }, [localKey]);

  useEffect(() => {
    if (storedKey !== localKey) {
      setLocalKey(storedKey);
    }
  }, [storedKey])

  const removeKey = () => {
    removeStoredKey();
    setLocalKey(null);
  }

  return <Context.Provider value={{ key: localKey, setKey: setLocalKey, removeKey, storeKey, setStoreKey }} {...props} />;
}

function useKey() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useKEy must be used within a KeyProvider');
  }
  return context;
}

export { Provider as KeyProvider, useKey };