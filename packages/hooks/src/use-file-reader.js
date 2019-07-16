import { useState, useEffect } from "react";

function useFileReader(inputRef) {
  const [result, setResult] = useState();
  const fileReader = new FileReader();
  useEffect(() => {
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

export default useFileReader;
