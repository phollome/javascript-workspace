import React from "react";

import { KeyProvider, ImageDataProvider, ResultProvider } from "./contexts";
import { AppToolbar, ImagePreview, ResultPreview } from "./components";

function App() {
  return (
    <KeyProvider>
      <ImageDataProvider>
        <ResultProvider>
          <AppToolbar />
          <ImagePreview />
          <ResultPreview />
        </ResultProvider>
      </ImageDataProvider>
    </KeyProvider>
  );
}

export default App;
