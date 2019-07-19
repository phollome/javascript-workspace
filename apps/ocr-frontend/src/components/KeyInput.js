import React, { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Save, Clear } from "@material-ui/icons";

function KeyInput(props) {
  const { label, onChange, value: externalValue, onClear } = props;
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
  const handleClick = evt => {
    if (inputRef.current && inputRef.current === evt.target) {
      setValue("");
    }
  };

  const handleClear = evt => {
    setShouldObfuscate(false);
    setValue("");
    onClear();
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
      onClick={handleClick}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Remove API-Key"
              onClick={handleClear}
              disabled={!value}
            >
              <Clear />
            </IconButton>
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
