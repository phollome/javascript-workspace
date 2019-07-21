import { useState, useEffect, useRef } from "react";

function useFileReader(inputRef) {
  const [result, setResult] = useState();
  const fileReader = useRef();
  useEffect(() => {
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

export default useFileReader;
