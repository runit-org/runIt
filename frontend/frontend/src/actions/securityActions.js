import axios from "axios";
import { GET_USERS, GET_ERRORS, SET_CURRENT_USER} from "./types";
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

export const login = (LoginRequest, navigate) => async (dispatch) => {
  try {
    //post => login request
    const res = await axios.post(
      "http://localhost:8000/api/auth/login/",
      LoginRequest
    );
    console.log(res);

    //extract token from data
    const token = res.data.access;
    //store token in local storage
    localStorage.setItem("token", token);
    //set token in header
    setToken(token);
    //get data from response
    const decoded = {
      username: res.data.username,
    };

    localStorage.setItem("username", decoded.username);
    if (localStorage.getItem("token")) {
      navigate("/posts");
    }

    //dispatch to securityReducer
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
    alert(error.response.data.detail)
  }
};

/* export const logout = (navigate) => async (dispatch) => {
  const res = await axios.get("http://localhost:8000/api/auth/logout");
  localStorage.clear();
  setToken(false);
  if (!localStorage.getItem("token")) {
    navigate("/signin");
  }
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
}; */

/* export const getUser = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/user/`);
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
}; */
