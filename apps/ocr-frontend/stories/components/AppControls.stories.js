import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import AppControls from "../../src/components/AppControls"

storiesOf("apps/ocr-frontend/components/AppControls", module).add("default", () => {
  return <AppControls />
});
