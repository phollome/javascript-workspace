import { useState } from "react";

function useFetchJSON() {
  const [result, setResult] = useState();
  const [inProgress, setInProgress] = useState(false);

  const makeRequest = async (url, options) => {
    setInProgress(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
    }
    setInProgress(false);
  };

  return [result, inProgress, makeRequest];
}

export default useFetchJSON;
