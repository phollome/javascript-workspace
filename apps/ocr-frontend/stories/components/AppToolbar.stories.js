import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import AppToolbar from "../../src/components/AppToolbar";

storiesOf("apps/ocr-frontend/components/AppToolbar", module).add(
  "default",
  () => {
    return <AppToolbar />;
  }
);
