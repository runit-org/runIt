import axios from "axios";
import store from "../store";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const refreshToken = () => {
  const ref = axios.post("http://localhost:8000/api/auth/token/refresh/", {
    refresh: localStorage.getItem("token"),
  });
  return ref;
};

const getAccessToken = async () => {
  await refreshToken()
    .then((res) => {
      console.log(res);
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
    });
};

export { setToken, refreshToken, getAccessToken };
