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
import ImageControl from "./controls/ImageControl";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

function AppToolbar(props) {
  const classes = useStyles();
  const inputRef = useRef();
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const { imageData } = useImageData();
  const { result, inProgress, makeRequest } = useResult();
  const { key } = useKey();

  const handleOpenKeyDialog = () => {
    setShowKeyDialog(true);
  }

  const handleDialogClose = () => {
    setShowKeyDialog(false);
  };

  if (result) {
    console.log(result);
  }

  return (
    <>
      <AppBar className={props.className} position="static" color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit">
            {AppName}
          </Typography>
          <AppControl label="Add API key" icon={<VpnKey />} onClick={handleOpenKeyDialog} />
          <ImageControl />
          <AppControl
            label="Process image"
            icon={<Refresh />}
            disabled={inProgress || !imageData}
            onClick={makeRequest}
          />
        </Toolbar>
      </AppBar>
      <KeyDialog open={showKeyDialog} onClose={handleDialogClose} />
    </>
  );
}

export default AppToolbar;
