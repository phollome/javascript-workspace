'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function useFileReader(inputRef) {
  const [result, setResult] = react.useState();
  const fileReader = react.useRef();
  react.useEffect(() => {
    const handler = () => {
      setResult(fileReader.current.result);
    };
    if (!fileReader.current) {
      fileReader.current = new FileReader();
    }
    fileReader.current.addEventListener("load", handler);
    return () => {
      fileReader.current.removeEventListener("load", handler);
    };
  });
  const changeHandler = () => {
    if (inputRef.current) {
      const file = inputRef.current.files[0];
      if (file) {
        fileReader.current.readAsDataURL(file);
      }
    }
  };
  return [result, changeHandler];
}

function useLocalStorageItem(key) {
  const [itemValue, setItemValue] = react.useState(null);

  react.useEffect(() => {
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

function useFetchJSON() {
  const [result, setResult] = react.useState();
  const [inProgress, setInProgress] = react.useState(false);

  const makeRequest = async (url, options) => {
    setInProgress(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
    }
    setInProgress(false);
  };

  return [result, inProgress, makeRequest];
}

exports.useFetchJSON = useFetchJSON;
exports.useFileReader = useFileReader;
exports.useLocalStorageItem = useLocalStorageItem;
