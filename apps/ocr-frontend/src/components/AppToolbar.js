import React, { useRef, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AddPhotoAlternate, Refresh, VpnKey } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useFileReader } from "@phollome/hooks";
import { name as AppName } from "../../package.json";
import AppControl from "./AppControl";
import { useImageData } from "../contexts/ImageDataContext";

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
  const { setImageData } = useImageData();
  const [src, onChange] = useFileReader(inputRef);

  useEffect(() => {
    if (src) {
      setImageData(src);
    }
  }, [src, setImageData]);

  const handleFileInput = () => {
    // TODO: Show prompt before override src
    onChange();
  };

  return (
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
  );
}

export default AppToolbar;
