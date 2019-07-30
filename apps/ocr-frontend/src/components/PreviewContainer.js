import React, { useState, useEffect } from "react";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useImageData, useResult } from "../contexts";
import { ImagePreview, ResultPreview } from "./";

function PreviewContainer(props) {
  const { imageData } = useImageData();
  const { result } = useResult();

  return (
    <>
      <ExpansionPanel disabled={!imageData}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}
          aria-controls="Image Preview"
          id="image-preview-panel">
          <Typography variant="h6">
            Image Preview
        </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ImagePreview />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel disabled={!result}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}
          aria-controls="Raw Result"
          id="raw-result-panel">
          <Typography variant="h6">
            Raw Result
        </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ResultPreview />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}

export default PreviewContainer;
