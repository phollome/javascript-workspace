import React, { useRef, useState, useEffect } from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFileReader, useLocalStorageItem } from "@phollome/hooks";
import KeyInput from "./components/KeyInput";

const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
}));

function App() {
  const inputRef = useRef();
  const [src, onChange] = useFileReader(inputRef);
  const [tmpKey, setTmpKey] = useState();
  const [key, setKey] = useLocalStorageItem("Key");
  const [storeKey = false, setStoreKey] = useLocalStorageItem("storeKey");
  const classes = useStyles();

  const handleKeyChange = value => {
    (storeKey && setKey(value)) || setTmpKey(value);
  };

  const handleStoreKeyChange = evt => {
    setStoreKey(evt.target.checked);
  };

  useEffect(() => {
    storeKey ? setKey(tmpKey) : setTmpKey(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeKey]);

  return (
    <>
      <KeyInput
        value={storeKey ? key : tmpKey}
        label="API-Key"
        onChange={handleKeyChange}
      />
      <FormControlLabel
        label="Store?"
        control={
          <Checkbox
            checked={storeKey}
            color="primary"
            onChange={handleStoreKeyChange}
          />
        }
      />
      <br />
      <input
        id="file-input"
        ref={inputRef}
        className={classes.input}
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <br />
      <img src={src} alt="" />
    </>
  );
}

export default App;
