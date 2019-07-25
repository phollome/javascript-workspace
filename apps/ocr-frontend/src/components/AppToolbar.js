import React, { useRef, useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AddPhotoAlternate, Refresh, VpnKey } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useFileReader, useFetchJSON } from "@phollome/hooks";
import { name as AppName } from "../../package.json";
import AppControl from "./AppControl";
import { useImageData, useKey, useResult } from "../contexts";
import AppDialog from "./AppDialog";
import KeyDialog from "./dialogs/KeyDialog";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
}));

function AppToolbar(props) {
  const classes = useStyles();
  const inputRef = useRef();
  const [showOverridePrompt, setShowOverridePrompt] = useState(false);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const { setImageData } = useImageData();
  const [src, onChange] = useFileReader(inputRef);
  const { result, inProgress, makeRequest } = useResult();
  const { key } = useKey();

  useEffect(() => {
    if (src) {
      console.log(src);
      setImageData(src);
    }
  }, [src])

  const handleOpenKeyDialog = () => {
    setShowKeyDialog(true);
  }

  const handleFileInput = () => {
    if (src) {
      setShowOverridePrompt(true);
    } else {
      onChange();
    }
  };

  const handleOverridePromptConfirm = () => {
    onChange();
    setShowOverridePrompt(false);
  };

  const handleDialogClose = () => {
    setShowOverridePrompt(false);
    setShowKeyDialog(false);
  };

  if (result) {
    console.log(result);
  }

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit">
            {AppName}
          </Typography>
          <AppControl label="Add API key" icon={<VpnKey />} onClick={handleOpenKeyDialog} />
          <input
            id="file-input"
            ref={inputRef}
            className={classes.input}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
          />
          <label htmlFor="file-input">
            <AppControl
              label="Load image"
              icon={<AddPhotoAlternate />}
              component="span"
            />
          </label>
          <AppControl
            label="Process image"
            icon={<Refresh />}
            disabled={inProgress || !!!src}
            onClick={makeRequest}
          />
        </Toolbar>
      </AppBar>
      <AppDialog
        open={showOverridePrompt}
        title="Override loaded image data"
        description={"Do you want to discard former loaded image data?"}
        onConfirm={handleOverridePromptConfirm}
        onClose={handleDialogClose}
      />
      <KeyDialog open={showKeyDialog} onClose={handleDialogClose} />
    </>
  );
}

export default AppToolbar;
