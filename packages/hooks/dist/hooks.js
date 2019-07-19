'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function useFileReader(inputRef) {
  const [result, setResult] = react.useState();
  const fileReader = new FileReader();
  react.useEffect(() => {
    const handler = () => {
      setResult(fileReader.result);
      fileReader.removeEventListener("load", handler);
    };
    fileReader.addEventListener("load", handler);
    return () => {
      fileReader.removeEventListener("load", handler);
    };
  });
  const changeHandler = () => {
    if (inputRef.current) {
      const file = inputRef.current.files[0];
      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
  };
  return [result, changeHandler];
}

function useLocalStorageItem(key) {
  const [itemValue, setItemValue] = react.useState();

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
    localStorage.setItem(key, value);
    setItemValue(value);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setItemValue(null);
  };

  return [itemValue, setItem, removeItem];
}

exports.useFileReader = useFileReader;
exports.useLocalStorageItem = useLocalStorageItem;
