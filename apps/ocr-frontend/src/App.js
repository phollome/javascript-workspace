import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFileReader, useLocalStorageItem } from "@phollome/hooks";
import KeyInput from "./components/KeyInput";

const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "30rem",
    fontFamily: '"Lucida Console", Monaco, monospace',
    fontSize: "0.8rem",
    lineHeight: 1.2,
  },
}));

function useRequest() {
  // maybe name it useFetch
  const [result, setResult] = useState();
  const [inProgress, setInProgress] = useState(false);

  const makeRequest = async (url, options) => {
    setInProgress(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
    }
    setInProgress(false);
  };

  return [result, inProgress, makeRequest];
}

function App() {
  const inputRef = useRef();
  const [src, onChange] = useFileReader(inputRef);
  const [tmpKey, setTmpKey] = useState();
  const [open, setOpen] = useState(false);
  const [key, setKey, removeKey] = useLocalStorageItem("Key");
  const [storeKey = false, setStoreKey] = useLocalStorageItem("storeKey");
  const [result, inProgress, request] = useRequest();
  const classes = useStyles();

  const handleKeyChange = value => {
    (storeKey && setKey(value)) || setTmpKey(value);
  };

  const handleStoreKeyChange = evt => {
    setStoreKey(evt.target.checked);
  };

  const handleDoRequest = async evt => {
    await request(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        storeKey ? key : tmpKey
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: src.split(";base64,")[1],
              },
              features: [
                {
                  type: "TEXT_DETECTION",
                },
              ],
            },
          ],
        }),
      }
    );
  };

  const handleInputChange = () => {
    if (src) {
      setOpen(true);
      return;
    }
    onChange();
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
        onClear={removeKey}
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
      {src && (
        <>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            onClick={handleDoRequest}
            disabled={inProgress}
          >
            Do Request
          </Button>
          {inProgress && <CircularProgress size={24} />}
        </>
      )}
      <input
        id="file-input"
        ref={inputRef}
        className={classes.input}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <br />
      <img src={src} alt="" />
      {result && (
        <textarea
          className={classes.textarea}
          cols="30"
          rows="10"
          defaultValue={JSON.stringify(result)}
        />
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You will override former data.
        </DialogTitle>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              onChange();
              setOpen(false);
            }}
          >
            Agree
          </Button>
          <Button color="primary" onClick={() => setOpen(false)} autoFocus>
            Abort
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
