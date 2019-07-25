import React, { createContext, useContext, useState } from "react";

const Context = createContext();

function Provider(props) {
  const [imageData, setImageData] = useState();
  return <Context.Provider value={{ imageData, setImageData }} {...props} />
}

function useImageData() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useImageData must be used within a ImageDataProvider');
  }
  return context;
}

export { Provider as ImageDataProvider, useImageData };
