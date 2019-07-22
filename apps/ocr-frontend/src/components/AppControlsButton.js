import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

function AppControlsButton(props) {
  const { label, icon, children, ...otherProps } = props;
  return (
    <Tooltip title={label}>
      <IconButton color="inherit" aria-label={label} {...otherProps}>
        {icon || children}
      </IconButton>
    </Tooltip>
  );
}

export default AppControlsButton;
