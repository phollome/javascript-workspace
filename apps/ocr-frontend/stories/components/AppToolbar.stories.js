import React from "react";
import { storiesOf } from "@storybook/react";
import AppToolbar from "../../src/components/AppToolbar";
import { ImageDataProvider } from "../../src/contexts/ImageDataContext";
import { KeyProvider } from "../../src/contexts/KeyContext";

storiesOf("apps/ocr-frontend/components/AppToolbar", module).add(
  "default",
  () => {
    return (
      <KeyProvider>
        <ImageDataProvider>
          <AppToolbar />
        </ImageDataProvider>
      </KeyProvider>
    );
  }
);
