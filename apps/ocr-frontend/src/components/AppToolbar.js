import React, { useRef, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AddPhotoAlternate, Refresh, VpnKey } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useFileReader } from "@phollome/hooks";
import { name as AppName } from "../../package.json";
import AppControl from "./AppControl";
import { useImageData } from "../contexts/ImageDataContext";
import AppDialog from "./AppDialog.js";

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
  const { setImageData } = useImageData();
  const [src, onChange] = useFileReader(inputRef);

  useEffect(() => {
    if (src) {
      setImageData(src);
    }
  }, [src, setImageData]);

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
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit">
            {AppName}
          </Typography>
          <AppControl label="Add API key" icon={<VpnKey />} />
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
            disabled={!!!src}
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
    </>
  );
}

export default AppToolbar;
