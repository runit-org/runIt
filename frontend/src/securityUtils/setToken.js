import axios from "axios";
import store from "../store";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../services/constants/types";
import Cookies from "js-cookie";
import { OK } from "../services/constants/responseStatus";

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
  try {
    const ref = await axios.post("/auth/token/refresh/", {
      refresh: Cookies.get("token"),
    });

    return ref;
  } catch (error) {
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: null,
    });

    return error.response;
  }
};

const getAccessToken = async () => {
  await refreshToken()
    .then((res) => {
      if (res.status === OK) {
        const decoded_token = jwt_decode(res.data.access);
        setToken(res.data.access);
        store.dispatch({
          type: SET_CURRENT_USER,
          payload: decoded_token,
        });
      } else {
        Cookies.remove("token");
        store.dispatch({
          type: SET_CURRENT_USER,
          payload: null,
        });
      }
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
