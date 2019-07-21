import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { useFileReader } from "../src";

storiesOf("packages/hooks/use-file-reader", module).add("default", () => {
  // Wrapping story into createElement is a workaround to use hooks in storyook context
  // https://github.com/storybookjs/storybook/issues/5721#issuecomment-472769646
  return React.createElement(() => {
    const inputRef = useRef();
    const [src, onChange] = useFileReader(inputRef);
    return (
      <div className="App">
        <h1>
          Hello useFileReader{" "}
          <span role="img" aria-label=":wave:">
            👋
          </span>
        </h1>
        <p>
          Use input{" "}
          <span role="img" aria-label=":point down:">
            👇
          </span>{" "}
          to upload image to preview.
        </p>
        <input ref={inputRef} type="file" onChange={onChange} />
        <br />
        <img src={src} alt="" />
      </div>
    );
  });
});
