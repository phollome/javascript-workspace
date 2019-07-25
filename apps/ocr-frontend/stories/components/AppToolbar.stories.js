import React from "react";
import { storiesOf } from "@storybook/react";
import AppToolbar from "../../src/components/AppToolbar";
import { ImageDataProvider, KeyProvider, ResultProvider } from "../../src/contexts";

storiesOf("apps/ocr-frontend/components/AppToolbar", module).add(
  "default",
  () => {
    return (
      <KeyProvider>
        <ImageDataProvider>
          <ResultProvider>
            <AppToolbar />
          </ResultProvider>
        </ImageDataProvider>
      </KeyProvider>
    );
  }
);
