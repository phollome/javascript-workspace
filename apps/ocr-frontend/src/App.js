import React, { useRef } from "react";
import { useFileReader } from "@phollome/hooks";

function App() {
  const inputRef = useRef();
  const [src, onChange] = useFileReader(inputRef);
  return (
    <>
      <input ref={inputRef} type="file" onChange={onChange} />
      <br />
      <img src={src} alt="" />
    </>
  );
}

export default App;
