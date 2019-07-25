import React, { createContext, useContext } from "react";
import { useFetchJSON } from "@phollome/hooks";
import { useKey, useImageData } from "./";

const Context = createContext();


function Provider(props) {
  const [result, inProgress, request] = useFetchJSON();
  const { key } = useKey();
  const { imageData } = useImageData();

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
  return <Context.Provider value={{ result, inProgress, makeRequest }} {...props} />;
}

function useResult() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
}

export { Provider as ResultProvider, useResult };
