import React from "react";
import { storiesOf } from "@storybook/react";
import { object } from "@storybook/addon-knobs";
import { ResultContainer } from "../../src/components";

import {
  KeyProvider,
  ImageDataProvider,
  ResultProvider,
} from "../../src/contexts";

storiesOf("apps/ocr-frontend/components/ResultContainer", module).add(
  "default",
  () => {
    const defaultResult = object("defaultResult", {});
    return (
      <KeyProvider>
        <ImageDataProvider>
          <ResultProvider defaultResult={defaultResult}>
            <ResultContainer />
          </ResultProvider>
        </ImageDataProvider>
      </KeyProvider>
    );
  }
);
