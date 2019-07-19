import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Save } from "@material-ui/icons";

function KeyInput(props) {
  const { label, onChange, value: externalValue } = props;
  const [value, setValue] = useState();
  const handleChange = (evt) => {
    setValue(evt.target.value);
  };
  const handleSubmit = () => {
    if (value) {
      onChange(value);
    }
  }

  useEffect(() => {
    if (externalValue !== value) {
      setValue(externalValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue]);

  return (
    <TextField
      value={value || ""}
      label={label}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Save API-Key"
              onClick={handleSubmit}
              disabled={!value || value === props.value}
            >
              <Save />
            </IconButton>
          </InputAdornment>
        ),
      }} />
  )
}

export default KeyInput;
