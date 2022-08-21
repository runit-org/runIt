import axios from "axios";
import { GET_USERS, GET_ERRORS, SET_CURRENT_USER, SET_NEW_USER } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";
import jwt_decode from "jwt-decode";

export const getUsers = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8000/api/user/all/`)
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
  (userData, setLoad, setShow, setError) => async (dispatch) => {
    setLoad(true);
    await axios
      .post("http://localhost:8000/api/auth/register/", userData)
      .then((res) => {
        if (res.data.success === "true") {
          setShow(true);
          setError(res.data);
        }
        dispatch({
          type: GET_ERRORS,
          payload: res.status,
        });
        dispatch({
          type: SET_NEW_USER,
          payload: res.data,
        });
      })

      .catch((error) => {
        setLoad(false);
        setShow(true);
        setError(error.response.data);
        dispatch({
          type: SET_NEW_USER,
          payload: {},
        });
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };

export const login =
  (LoginRequest, navigate, setLoad, setShow, setError) => async (dispatch) => {
    //post => login request
    setLoad(true);
    await axios
      .post("http://localhost:8000/api/auth/login/", LoginRequest)
      .then((res) => {
        //extract token from data
        const refToken = res.data.refresh;
        const accessToken = res.data.access;
        //store token in local storage
        localStorage.setItem("token", refToken);
        localStorage.setItem("accessToken", accessToken);
        //set token in header
        setToken(accessToken);
        //get data from response
        const decoded_token = jwt_decode(res.data.access);
        const decoded = {
          username: res.data.username,
        };

        localStorage.setItem("username", decoded.username);
        if (localStorage.getItem("token")) {
          navigate("/posts");
        }
        dispatch({
          type: GET_ERRORS,
          payload: res.status,
        });
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded_token,
        });
      })
      .catch((error) => {
        setLoad(false);
        setShow(true);
        setError(error.response.data.detail);
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };

export const logout = (refToken, navigate) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    return axios.post("http://localhost:8000/api/auth/logout/", refToken);
  });

  setToken(false);
  localStorage.clear();
  if (!localStorage.getItem("token")) {
    navigate("/");
  }
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
};

export const resetPwEmail =
  (userData, setLoad, setShow, setError) => async (dispatch) => {
    setLoad(true);
    await axios
      .post("http://localhost:8000/api/auth/sendResetPasswordEmail/", userData)
      .then((res) => {
        if (res.status === 200) {
          setLoad(false);
          setShow(true);
          setError(res.data.message);
        }
        dispatch({
          type: GET_ERRORS,
          payload: res.status,
        });
      })

      .catch((error) => {
        setLoad(false);
        setShow(true);
        setError(error.response.data);

        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };

export const resetPw =
  (userData, setLoad, setShow, setError) => async (dispatch) => {
    setLoad(true);
    await axios
      .post(`http://localhost:8000/api/auth/resetPassword/`, userData)
      .then((res) => {
        if (res.status === 200) {
          setLoad(false);
          setShow(true);
          setError(res.data.message);
        }
        dispatch({
          type: GET_ERRORS,
          payload: res.status,
        });
      })

      .catch((error) => {
        setLoad(false);
        setShow(true);
        setError(error.response.data.message);

        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  };
