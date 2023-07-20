import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CurrAuthUser = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);

  var error = useSelector((errorReducer) => errorReducer.errors.errors.status);

  useEffect(() => {
    if (!error) {
      setIsAuth(true);
    } else {
      return () => {
        localStorage.clear();
        Cookies.remove("token");
        navigate(0);
      };
    }
  }, [error, navigate, children]);

  return isAuth && !error ? children : null;
};
