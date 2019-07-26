import React from "react";
import { storiesOf } from "@storybook/react";
import { ResultPreview } from "../../src/components";
import { KeyProvider, ImageDataProvider, ResultProvider } from "../../src/contexts";

storiesOf("apps/ocr-frontend/components/ResultPreview", module).add(
  "default",
  () => {
    return (
      <KeyProvider>
        <ImageDataProvider>
          <ResultProvider defaultResult={{}}>
            <ResultPreview />
          </ResultProvider >
        </ImageDataProvider>
      </KeyProvider>
    );
  }
);
