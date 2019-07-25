import React, { useState, useEffect } from "react";
import { useKey } from "../../contexts/KeyContext";
import AppDialog from "../AppDialog";
import { Button, TextField, FormControlLabel, Checkbox } from "@material-ui/core";

function KeyDialog(props) {
  const { open, onClose } = props;

  const [keyInput, setKeyInput] = useState("");

  const { key, setKey, removeKey, storeKey, setStoreKey } = useKey();

  useEffect(() => {
    if (key && key !== keyInput) {
      setKeyInput(key);
    }
  }, [key])

  const handleKeyInput = (evt) => {
    setKeyInput(evt.target.value);
  };

  const handleStoreKey = (evt) => {
    setStoreKey(evt.target.checked);
    removeKey();
  };

  const handleKeySave = () => {
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
    onClose();
  }

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
      <TextField value={keyInput} onChange={handleKeyInput} fullWidth autoFocus />
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
