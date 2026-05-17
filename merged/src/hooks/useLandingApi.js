import { useState, useEffect, useRef } from "react";
import { createClient } from "@/api/client";

export function useLandingApi(apiEndpoint, apiKey) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevEndpoint = useRef(null);

  useEffect(() => {
    if (!apiEndpoint) {
      setLoading(false);
      return;
    }
    if (prevEndpoint.current === apiEndpoint) return;
    prevEndpoint.current = apiEndpoint;

    const client = createClient(apiKey);
    let cancelled = false;

    setLoading(true);
    setError(null);

    client
      .get(apiEndpoint)
      .then((res) => {
        if (!cancelled) {
          setData(res.status ? res.data : null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setData(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiEndpoint, apiKey]);

  return { data, loading, error };
}
