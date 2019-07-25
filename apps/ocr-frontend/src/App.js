import React from "react";

import { KeyProvider, ImageDataProvider } from "./contexts";
import { AppToolbar, ImagePreview, ResultPreview } from "./components";

function App() {
  return (
    <KeyProvider>
      <ImageDataProvider>
        <AppToolbar />
        <ImagePreview />
        <ResultPreview />
      </ImageDataProvider>
    </KeyProvider>
  );
}

export default App;
