import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AddPhotoAlternate, Refresh, VpnKey } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { name as AppName } from "../../package.json";
import AppControl from "./AppControl";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

function AppToolbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit">
          {AppName}
        </Typography>
        <AppControl label="Add API key" icon={<VpnKey />} />
        <AppControl label="Load image" icon={<AddPhotoAlternate />} />
        <AppControl label="Process image" icon={<Refresh />} disabled />
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;
