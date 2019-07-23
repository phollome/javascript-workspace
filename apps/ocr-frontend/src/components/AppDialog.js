import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@material-ui/core";

function AppDialog(props) {
  const { open, title, description, onConfirm, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={title}
      aria-describedby={description}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
        <Button onClick={onConfirm} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppDialog;
