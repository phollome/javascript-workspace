import React, { useRef, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFileReader } from "@phollome/hooks";
import KeyInput from "./components/KeyInput";

const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
}));

function App() {
  const inputRef = useRef();
  const [src, onChange] = useFileReader(inputRef);
  const [apiKey, setAPIKey] = useState();
  const classes = useStyles();

  const handleAPIKeyChange = (value) => {
    setAPIKey(value);
  }

  return (
    <>
      <KeyInput value={apiKey} label="API-Key" onChange={handleAPIKeyChange} /><br />
      <input id="file-input" ref={inputRef} className={classes.input} type="file" accept="image/*" onChange={onChange} />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">Upload</Button>
      </label>
      <br />
      <img src={src} alt="" />
    </>
  );
}

export default App;
