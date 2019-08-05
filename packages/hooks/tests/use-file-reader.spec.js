import React, { useRef } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { act } from 'react-test-renderer';
import { useFileReader } from "../src";

const inputLabelText = "File Upload";
const imageSrc = "🕶 + 🙂 = 😎";

test("handle file input change", (done) => {
  const { getByLabelText, getByText } = render(<Comp />);
  const input = getByLabelText(inputLabelText);

  const file = new File([imageSrc], "sunglasses.png", {
    type: "image/png"
  });
  Object.defineProperty(input, "files", {
    value: [file]
  });
  fireEvent.change(input);

  setTimeout(() => {
    getByText(/data:image\/png;base64,/i);
    done();
  }, 100);
});

function Comp() {
  const inputRef = useRef();
  const [src, onChange] = useFileReader(inputRef);
  src && console.log(src);
  return (
    <>
      <label id="file-input">{inputLabelText}</label>
      <input aria-labelledby="file-input" ref={inputRef} type="file" onChange={onChange} />
      {src && (<p>{src}</p>)}
    </>
  );
}

