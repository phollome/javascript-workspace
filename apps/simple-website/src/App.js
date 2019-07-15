import PixelAvatar from "./components/PixelAvatar";
import React from "react";
import {useTest} from "@phollome/hooks"

function App() {
  const {testFunc} = useTest()
  testFunc();
  return <PixelAvatar />;
}

export default App;
