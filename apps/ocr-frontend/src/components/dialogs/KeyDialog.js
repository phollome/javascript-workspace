import React, { useState, useEffect } from "react";
import { useKey } from "../../contexts/KeyContext";
import AppDialog from "../AppDialog";
import { Button, TextField, FormControlLabel, Checkbox } from "@material-ui/core";

function KeyDialog(props) {
  const { open, onClose } = props;

  const [keyInput, setKeyInput] = useState("");
  const [obfuscatedKey, setObfuscatedKey] = useState()
  const [shouldShowObfuscatedString, setShouldShowObfuscatedString] = useState(true);

  const { key, setKey, removeKey, storeKey, setStoreKey } = useKey();

  useEffect(() => {
    if (key && key !== keyInput) {
      setKeyInput(key);
    }
  }, [key])

  useEffect(() => {
    setObfuscatedKey(keyInput.slice(-4).padStart(keyInput.length, "*"))
  }, [keyInput]);

  const handleKeyInput = (evt) => {
    setKeyInput(evt.target.value);
  };

  const handleStoreKey = (evt) => {
    setStoreKey(evt.target.checked);
    removeKey();
  };

  const handleKeySave = () => {
    setShouldShowObfuscatedString(true);
    setKey(keyInput);
  };

  const handleKeyRemove = () => {
    setKeyInput("");
    removeKey();
  };

  const handleClose = () => {
    if (keyInput !== key) {
      setKeyInput(key || "");
    }
    setShouldShowObfuscatedString(true);
    onClose();
  }

  const handleFocus = () => {
    setShouldShowObfuscatedString(false);
  };

  const handleBlur = () => {
    setShouldShowObfuscatedString(true);
  };

  return (
    <AppDialog open={open}
      title="Set API Key"
      description={"Please provide a GCP API Key"}
      onClose={handleClose}
      actions={(<>
        <Button color="primary" onClick={handleClose}>
          Close
        </Button>
        <Button color="primary" onClick={handleKeyRemove} disabled={!keyInput}>
          Delete
          </Button>
        <Button color="primary" onClick={handleKeySave} disabled={!keyInput}>
          Save
        </Button>
      </>)}
    >
      <TextField value={shouldShowObfuscatedString ? obfuscatedKey : keyInput} onFocus={handleFocus} onBlur={handleBlur} onChange={handleKeyInput} fullWidth />
      <FormControlLabel
        control={
          <Checkbox
            checked={storeKey}
            value="checkedB"
            color="primary"
            onChange={handleStoreKey}
          />
        }
        label="store local"
      />
    </AppDialog>
  );
}

export default KeyDialog;
