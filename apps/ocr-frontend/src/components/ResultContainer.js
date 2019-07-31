import React, { useState, useEffect } from "react";
import { useResult } from "../contexts";

const parseResult = (result) => {
  const lines = [];
  const blocks = [];
  const fullTextAnnotation = result.responses[0].fullTextAnnotation;
  if (fullTextAnnotation !== null) {
    fullTextAnnotation.pages[0].blocks.forEach(block => {
      let bl = [];
      block.paragraphs.forEach(paragraph => {
        let line = "";
        paragraph.words.forEach(word => {
          word.symbols.forEach(symbol => {
            line += symbol.text;
            if (symbol.property && symbol.property.detectedBreak) {
              if (symbol.property.detectedBreak.type === "SPACE") {
                line += " ";
              } else if (
                symbol.property.detectedBreak.type === "EOL_SURE_SPACE"
              ) {
                line += "";
                lines.push(line);
                bl.push(line);
                line = "";
              } else if (symbol.property.detectedBreak.type === "LINE_BREAK") {
                lines.push(line);
                bl.push(line);
                line = "";
              }
            }
          });
        });
      });
      blocks.push(bl);
    });
  }
  return blocks;
}

const useParsedResult = () => {
  const { result } = useResult();
  const [parsedResult, setParsedResult] = useState();

  useEffect(() => {
    try {
      setParsedResult(parseResult(result));
    } catch (err) {
      console.error(err);
    }
  }, [result]);

  return parsedResult;
}

function ResultContainer(props) {
  const parsedResult = useParsedResult();
  console.log(parsedResult);
  return <div className={props.className}>
    {
      parsedResult
        ? parsedResult.map(block => {
            return <textarea
                cols="30"
                rows="10"
                value={block}
              />
          })
        : null
    }
  </div>
}

export default ResultContainer;
