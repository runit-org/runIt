import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useCurrentPath() {
  let location = useLocation();
  const [currPath, setCurrPath] = useState("");

  useEffect(() => {
    if (location) {
      setCurrPath(location.pathname);
    }
  }, [location]);

  return currPath;
}
