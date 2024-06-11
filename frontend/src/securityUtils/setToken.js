import axios from "axios";
import store from "../store";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../services/constants/types";
import Cookies from "js-cookie";
import { OK } from "../services/constants/responseStatus";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV;

axios.defaults.baseURL = `${baseURL}/api`;

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const handleRefTokenError = () => {
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
  Cookies.remove("runit_token");
};

const refreshToken = async () => {
  try {
    const ref = await axios.post("/auth/token/refresh/", {
      refresh: Cookies.get("runit_token"),
    });
    return ref;
  } catch (error) {
    handleRefTokenError();
    return error.response;
  }
};

const getAccessToken = async () => {
  try {
    const refToken = await refreshToken();

    if (refToken && refToken.status === OK) {
      const decoded_token = jwt_decode(refToken.data.access);
      setToken(refToken.data.access);
      store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_token,
      });
    } else {
      handleRefTokenError();
    }
  } catch (error) {
    store.dispatch({
      type: GET_ERRORS,
      payload: error.message,
    });
    handleRefTokenError();
  }
};

export { setToken, refreshToken, getAccessToken };
