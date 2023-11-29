import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useAuthStatus() {
  let location = useLocation();
  const [isValid, setIsValid] = useState(false);
  const token = Cookies.get("runit_token");

  useEffect(() => {
    if (token && location.state === null) setIsValid(token);
  }, [token, location.state]);

  return isValid;
}
