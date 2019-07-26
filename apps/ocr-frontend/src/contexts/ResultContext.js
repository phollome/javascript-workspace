import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchJSON } from "@phollome/hooks";
import { useKey, useImageData } from "./";

const Context = createContext();


function Provider(props) {
  const { defaultResult, ...otherProps } = props;
  const [localResult, setLocalResult] = useState();
  const [result, inProgress, request] = useFetchJSON();
  const { key } = useKey();
  const { imageData } = useImageData();

  console.log(localResult);

  useEffect(() => {
    if (result !== localResult) {
      setLocalResult(result);
    }
  }, [result]);

  useEffect(() => {
    setLocalResult(defaultResult);
  }, [defaultResult]);

  const makeRequest = () => {
    request(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: imageData.split(";base64,")[1],
            },
            features: [
              {
                type: "TEXT_DETECTION",
              },
            ],
          },
        ],
      }),
    });
  };
  return <Context.Provider value={{ result: localResult, updateResult: setLocalResult, inProgress, makeRequest }} {...otherProps} />;
}

function useResult() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
}

export { Provider as ResultProvider, useResult };
