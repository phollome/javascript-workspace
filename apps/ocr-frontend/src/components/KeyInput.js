import React, { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Save } from "@material-ui/icons";

function KeyInput(props) {
  const { label, onChange, value: externalValue } = props;
  const [value, setValue] = useState();
  const [shouldObfuscate, setShouldObfuscate] = useState(true);
  const inputRef = useRef();

  const handleChange = evt => {
    setShouldObfuscate(false);
    setValue(evt.target.value);
  };
  const handleSubmit = () => {
    if (value) {
      setShouldObfuscate(true);
      onChange(value);
    }
  };
  const handleClear = evt => {
    if (inputRef.current && inputRef.current === evt.target) {
      setValue("");
    }
  };

  const obfuscate = string => {
    return shouldObfuscate
      ? string.slice(-4).padStart(string.length, "*")
      : string;
  };

  useEffect(() => {
    if (externalValue && externalValue !== value) {
      setValue(externalValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue]);

  return (
    <TextField
      value={obfuscate(value || "")}
      label={label}
      inputRef={inputRef}
      onChange={handleChange}
      onClick={handleClear}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Save API-Key"
              onClick={handleSubmit}
              disabled={!value || value === obfuscate(props.value)}
            >
              <Save />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default KeyInput;
