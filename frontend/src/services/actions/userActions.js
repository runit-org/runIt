import axios from "axios";
import {
  GET_ERRORS,
  GET_USER_PROFILE,
  GET_CURRENT_USER_PROFILE,
  SET_CURRENT_USER,
} from "../constants/types";
import { setToken, refreshToken } from "../../securityUtils/setToken";

export const getUserProfile = (userName) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/user/profile/${userName}/`)
      .then((res) => {
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};

export const getCurrentUserProfile = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/user/me/`)
      .then((res) => {
        dispatch({
          type: GET_CURRENT_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
        dispatch({
          type: SET_CURRENT_USER,
          payload: null,
        });
      });
  });
};

export const vote = (id, postData) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .post(`http://localhost:8000/api/user/vote/${id}/`, postData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};

export const userStatus = (postData, setLoad, setError) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    setLoad(true);
    axios
      .put(`http://localhost:8000/api/user/updateStatusMessage/`, postData)
      .then((res) => {
        setLoad(false);
        setError(res.data);
      })
      .catch((error) => {
        setLoad(false);
        setError(error.response.data);
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};
