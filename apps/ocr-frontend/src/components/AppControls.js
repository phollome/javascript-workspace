import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AddPhotoAlternate, Refresh, VpnKey } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { name as AppName } from "../../package.json";
import AppControlsButton from "./AppControlsButton.js";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

function AppControls(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit">
          {AppName}
        </Typography>
        <AppControlsButton label="Add API key" icon={<VpnKey />} />
        <AppControlsButton label="Load image" icon={<AddPhotoAlternate />} />
        <AppControlsButton label="Process image" icon={<Refresh />} disabled />
      </Toolbar>
    </AppBar>
  );
}

export default AppControls;
