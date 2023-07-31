import axios from "axios";
import store from "../store";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../services/constants/types";
import Cookies from "js-cookie";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const refreshToken = async () => {
  if (Cookies.get("token")) {
    const ref = await axios.post("/auth/token/refresh/", {
      refresh: Cookies.get("token"),
    });
    return ref;
  } else {
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: null,
    });
  }
};

const getAccessToken = async () => {
  await refreshToken()
    .then((res) => {
      setToken(res.data.access);
      const decoded_token = jwt_decode(res.data.access);
      store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_token,
      });
    })
    .catch((error) => {
      store.dispatch({
        type: GET_ERRORS,
        payload: error.message,
      });
      store.dispatch({
        type: SET_CURRENT_USER,
        payload: null,
      });
    });
};

export { setToken, refreshToken, getAccessToken };
