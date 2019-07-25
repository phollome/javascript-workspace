import React from "react";
import { useImageData } from "../contexts/ImageDataContext";

function ImagePreview(props) {
  const { imageData } = useImageData();
  return <img src={imageData} alt="Image preview" />
}

export default ImagePreview;
