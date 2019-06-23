import React from "react";

const outline = "#000";
const stripes = "rgb(32,54,101)";

function PixelAvatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 29"
      shapeRendering="crispEdges"
    >
      <path
        fill={outline}
        d="
          M8,1 v1h5v-1
          M6,2 v1h9v-1
          M5,3 v1h11v-1
          M5,4 v1h12v-1
          M4,5 v2h14v-2
          M3,7 v2h16v-2
          M3,9 v6h15v-6
          M2,15 v2h17v-2
          M1,17 v4h19v-4
          M2,21 v1h3v-1 M6,21 v1h9v-1 M16,21 v1h3v-1
          M5,22 v1h11v-1
          M4,23 v1h13v-1
          M3,24 v1h7v-1 M11,24 v1h7v-1
          M2,25 v1h7v-1 M12,25 v1h7v-1
          M1,26 v2h8v-2 M12,26 v2h8v-2
        "
      />
      <path
        fill={stripes}
        d="
          M3,15 v1h1v-1 M17,15 v1h1v-1
          M3,16 v1h2v-1 M16,16 v1h2v-1
          M4,17 v1h2v-1 M10,17 v1h1v-1 M15,17 v1h2v-1
          M10,18 v1h1v-1
          M10,19 v1h1v-1
          M10,20 v1h1v-1
          M7,21 v1h7v-1
        "
      />
    </svg>
  );
}

export default PixelAvatar;
