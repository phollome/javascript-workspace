import React, { useRef, useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AddPhotoAlternate, Refresh, VpnKey } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useFileReader, useFetchJSON } from "@phollome/hooks";
import { name as AppName } from "../../package.json";
import AppControl from "./AppControl";
import { useImageData } from "../contexts/ImageDataContext";
import { useKey } from "../contexts/KeyContext";
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
  const [result, inProgress, request] = useFetchJSON();
  const { key } = useKey();

  useEffect(() => {
    if (src) {
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

  const handleProcess = () => {
    request(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
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
    });
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
            onClick={handleProcess}
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
