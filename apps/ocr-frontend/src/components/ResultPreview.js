import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useResult } from "../contexts";

const useStyles = makeStyles(() => ({
  textarea: {
    width: "100%",
    minHeight: "30rem",
    fontFamily: '"Lucida Console", Monaco, monospace',
    fontSize: "0.8rem",
    lineHeight: 1.2,
  },
}));

function ResultPreview(props) {
  const { result, updateResult } = useResult();
  const [value, setValue] = useState();
  const classes = useStyles();

  useEffect(() => {
    const stringifiedResult = JSON.stringify(result);
    if (stringifiedResult !== value) {
      setValue(stringifiedResult);
    }
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleUpdate = () => {
    const stringifiedResult = JSON.stringify(result);
    if (value !== stringifiedResult) {
      try {
        const parsedValue = JSON.parse(value);
        updateResult(parsedValue);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <textarea
        className={classes.textarea}
        cols="30"
        rows="10"
        value={value}
        onChange={handleChange}
      />
      <Button color="primary" onClick={handleUpdate}>Update</Button>
    </>
  );
}

export default ResultPreview;
