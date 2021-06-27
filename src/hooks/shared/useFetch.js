import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (json.error) {
        setError(json);
      } else {
        setData(json);
        console.log(data);
      }
      setLoading(false);
    })();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
