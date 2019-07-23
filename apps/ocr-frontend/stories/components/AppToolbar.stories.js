import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import AppToolbar from "../../src/components/AppToolbar";
import { ImageDataProvider } from "../../src/contexts/ImageDataContext";

storiesOf("apps/ocr-frontend/components/AppToolbar", module).add(
  "default",
  () => {
    return (
      <ImageDataProvider>
        <AppToolbar />
      </ImageDataProvider>
    );
  }
);
