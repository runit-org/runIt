import axios from "axios";
import {
  GET_USERS,
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_NEW_USER,
  GET_USER,
} from "../constants/types";
import { setToken, refreshToken } from "../../securityUtils/setToken";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import * as ResponseStatus from "../constants/responseStatus";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getUsers = () => async (dispatch) => {
  await axios
    .get(`/user/all/`)
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const createNewUser =
  (userData, setLoad, navigate) => async (dispatch) => {
    setLoad(true);
    await axios
      .post("/auth/register/", userData)
      .then((res) => {
        if (res.status === ResponseStatus.OK) {
          navigate("/", {
            replace: true,
            state: { id: res.data },
          });
        }
        dispatch({
          type: GET_ERRORS,
          payload: res,
        });
        dispatch({
          type: SET_NEW_USER,
          payload: res.data,
        });
      })

      .catch((error) => {
        setLoad(false);
        dispatch({
          type: SET_NEW_USER,
          payload: {},
        });
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
      });
  };

export const login = (LoginRequest, navigate, setLoad) => async (dispatch) => {
  setLoad(true);
  await axios
    .post("/auth/login/", LoginRequest)
    .then((res) => {
      //extract token from data
      const refToken = res.data.refresh;
      const accessToken = res.data.access;
      //store token in local storage
      Cookies.set("token", refToken, { sameSite: "strict" });
      //set token in header
      setToken(accessToken);
      //get data from response
      const decoded_token = jwt_decode(res.data.access);
      const decoded = {
        username: res.data.username,
      };

      localStorage.setItem("username", decoded.username);

      if (res.status === ResponseStatus.OK && Cookies.get("token")) {
        setLoad(true);
        navigate("/posts");
      }
      dispatch({
        type: GET_USER,
        payload: res,
      });

      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_token,
      });
    })
    .catch((error) => {
      setLoad(false);
      dispatch({
        type: GET_ERRORS,
        payload: error.response,
      });
    });
};

export const logout = (refToken, navigate) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    return axios.post("/auth/logout/", refToken);
  });

  setToken(false);
  localStorage.clear();
  Cookies.remove("token");
  navigate(0);

  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
};

export const resetPwEmail = (userData, setLoad) => async (dispatch) => {
  setLoad(true);
  await axios
    .post("/auth/sendResetPasswordEmail/", userData)
    .then((res) => {
      if (res.status === ResponseStatus.OK) {
        setLoad(false);
      }
      dispatch({
        type: GET_ERRORS,
        payload: res,
      });
    })

    .catch((error) => {
      setLoad(false);

      dispatch({
        type: GET_ERRORS,
        payload: error.response,
      });
    });
};

export const resetPw = (userData, setLoad) => async (dispatch) => {
  setLoad(true);
  await axios
    .post(`/auth/resetPassword/`, userData)
    .then((res) => {
      if (res.status === ResponseStatus.OK) {
        setLoad(false);
      }
      dispatch({
        type: GET_ERRORS,
        payload: res,
      });
    })

    .catch((error) => {
      setLoad(false);

      dispatch({
        type: GET_ERRORS,
        payload: error.response,
      });
    });
};

export const verifyEmail = (data, setLoad) => async (dispatch) => {
  setLoad(true);
  return await axios
    .post(`/auth/verifyEmail/`, data)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      setLoad(false);
      dispatch({
        type: GET_ERRORS,
        payload: error.response,
      });
      return error;
    });
};

export const resendOtp = (setLoad) => async (dispatch) => {
  setLoad(true);
  return await axios
    .post(`/auth/resendVerifyEmail/`)
    .then((res) => {
      if (res.status === ResponseStatus.OK) {
        setLoad(false);
      }
      dispatch({
        type: GET_ERRORS,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      setLoad(false);
      dispatch({
        type: GET_ERRORS,
        payload: error.response,
      });
      return error;
    });
};
