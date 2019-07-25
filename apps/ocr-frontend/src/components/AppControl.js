import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

function AppControl(props) {
  const { label, icon, children, ...otherProps } = props;
  return (
    <Tooltip title={label}>
      <div>
        <IconButton color="inherit" aria-label={label} {...otherProps}>
          {icon || children}
        </IconButton>
      </div>
    </Tooltip>
  );
}

export default AppControl;
