import React from "react";
import { storiesOf } from "@storybook/react";
import { ResultPreview } from "../../src/components";
import PreviewContainer from "../../src/components/PreviewContainer";
import ImageControl from "../../src/components/controls/ImageControl";
import { KeyProvider, ImageDataProvider, ResultProvider } from "../../src/contexts";

storiesOf("apps/ocr-frontend/components/PreviewContainer", module).add(
  "default",
  () => {
    return (
      <KeyProvider>
        <ImageDataProvider>
          <ResultProvider defaultResult={{}}>
            <ImageControl />
            <PreviewContainer />
          </ResultProvider >
        </ImageDataProvider>
      </KeyProvider>
    );
  }
);
