import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/actions/securityActions";

export function useHandleLogout(e) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const token = Cookies.get("runit_token");
    const refToken = {
      refresh: token,
    };
    dispatch(logout(refToken, navigate));
  };

  return handleLogout;
}
