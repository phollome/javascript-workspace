import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
  const { result } = { result: {} };
  const classes = useStyles();
  return <textarea
    className={classes.textarea}
    cols="30"
    rows="10"
    defaultValue={JSON.stringify(result)}
  />
}

export default ResultPreview;
