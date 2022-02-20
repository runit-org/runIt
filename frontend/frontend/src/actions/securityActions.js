import axios from "axios";
import { GET_USERS, GET_ERRORS, SET_CURRENT_USER, SET_NEW_USER } from "./types";
import setToken from "../securityUtils/setToken";
import jwt_decode from "jwt-decode";

export const getUsers = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/user/all/`);
  // console.log(res)
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

export const createNewUser =
  (userData, setLoad, setShow, setError) => async (dispatch) => {
    try {
      setLoad(true);
      const res = await axios.post(
        "http://localhost:8000/api/auth/register/",
        userData
      );

      if (res.data.success == "true") {
        setLoad(false);
        setShow(true);
        setError(res.data.message);
      }
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      dispatch({
        type: SET_NEW_USER,
        payload: res.data,
      });
    } catch (error) {
      setLoad(false);
      setShow(true);
      setError(error.response.data.message);
      dispatch({
        type: SET_NEW_USER,
        payload: {},
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

export const login =
  (LoginRequest, navigate, setLoad, setShow, setError) => async (dispatch) => {
    try {
      //post => login request
      setLoad(true);
      const res = await axios.post(
        "http://localhost:8000/api/auth/login/",
        LoginRequest
      );

      //extract token from data
      const refToken = res.data.refresh;
      const accessToken = res.data.access;
      //store token in local storage
      localStorage.setItem("token", refToken);
      localStorage.setItem("accessToken", accessToken);
      //set token in header
      setToken(accessToken);
      //get data from response
      const decoded = {
        username: res.data.username,
      };

      localStorage.setItem("username", decoded.username);
      if (localStorage.getItem("token")) {
        navigate("/posts");
      }

      //dispatch to securityReducer
      /*  dispatch({
      type: GET_ERRORS,
      payload: {},
    }); */
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
    } catch (error) {
      setLoad(false);
      setShow(true);
      setError(error.response.data.detail);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

export const logout = (refToken, navigate) => async (dispatch) => {
  const res = await axios.post(
    "http://localhost:8000/api/auth/logout/",
    refToken
  );

  setToken(false);
  localStorage.clear();
  // navigate("/");
  if (!localStorage.getItem("token")) {
    navigate("/");
  }
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
};

/* export const getUser = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/user/`);
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
}; */
