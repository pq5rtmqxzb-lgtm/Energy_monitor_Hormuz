import { useCallback, useEffect, useState } from "react";

function parseHash() {
  return new URLSearchParams(window.location.hash.replace(/^#/, ""));
}

function writeHash(params) {
  const s = params.toString();
  const target = s ? `#${s}` : window.location.pathname + window.location.search;
  window.history.replaceState(null, "", target);
}

export function useHashParam(key, initial) {
  const [value, setValue] = useState(() => parseHash().get(key) ?? initial);

  useEffect(() => {
    const params = parseHash();
    if (!value || value === initial) params.delete(key);
    else params.set(key, value);
    writeHash(params);
  }, [key, value, initial]);

  useEffect(() => {
    const onHash = () => {
      const v = parseHash().get(key) ?? initial;
      setValue(v);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [key, initial]);

  return [value, useCallback((v) => setValue(v), [])];
}
