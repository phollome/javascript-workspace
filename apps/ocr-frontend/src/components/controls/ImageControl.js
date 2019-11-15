import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AddPhotoAlternate } from "@material-ui/icons";
import { useFileReader } from "@phollome/hooks";
import AppControl from "./../AppControl";
import AppDialog from "./../AppDialog";
import { useImageData } from "./../../contexts";

const useStyles = makeStyles(theme => ({
  input: {
    display: "none",
  },
}));

function ImageControl(props) {
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [src, onChange] = useFileReader(inputRef);
  const { setImageData } = useImageData();
  const classes = useStyles();

  useEffect(() => {
    if (src) {
      console.log(src);
      setImageData(src);
    }
  }, [src, setImageData]);

  const handleFileInput = () => {
    if (src) {
      setOpen(true);
    } else {
      onChange();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onChange();
    setOpen(false);
  };

  return (
    <>
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
      <AppDialog
        open={open}
        title="Override loaded image data"
        description={"Do you want to discard former loaded image data?"}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  )
}

export default ImageControl;
