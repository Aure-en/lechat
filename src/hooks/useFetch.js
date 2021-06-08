import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      if (json.error) {
        setError(json);
      } else {
        setData(json);
      }
      setLoading(false);
    })();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
