import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { name as AppName } from "../../package.json";
import { makeStyles } from "@material-ui/styles";
import { classes } from "istanbul-lib-coverage";

const useStyles = makeStyles((theme) => ({
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
        <Button color="inherit">Add API-Key</Button>
        <Button color="inherit">Load Image</Button>
        <Button color="inherit" disabled>Process Image</Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppControls;
