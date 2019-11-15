import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Refresh, VpnKey } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { name as AppName } from "../../package.json";
import AppControl from "./AppControl";
import { useImageData, useResult } from "../contexts";
import KeyDialog from "./dialogs/KeyDialog";
import ImageControl from "./controls/ImageControl";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

function AppToolbar(props) {
  const classes = useStyles();
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const { imageData } = useImageData();
  const { result, inProgress, makeRequest } = useResult();

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
