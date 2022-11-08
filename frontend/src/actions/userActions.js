import axios from "axios";
import { GET_ERRORS, GET_USER_PROFILE } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

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