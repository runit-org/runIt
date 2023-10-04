import axios from "axios";
import {
  GET_ERRORS,
  GET_USER_PROFILE,
  GET_CURRENT_USER_PROFILE,
  SET_CURRENT_USER,
  GET_VOTES,
  GET_USER_ACTIVITY,
} from "../constants/types";
import { setToken, refreshToken } from "../../securityUtils/setToken";
import { OK } from "../constants/responseStatus";
import {
  securedGet,
  securedPost,
  securedPut,
} from "../../securityUtils/securedAxios";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getUserProfile = (userName) => async (dispatch) => {
  const apiEndpoint = `/user/profile/${userName}/`;
  return await securedGet(dispatch, apiEndpoint, null, GET_USER_PROFILE);
};

export const getCurrentUserProfile = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/user/me/`)
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
  const apiEndpoint = `/user/vote/${id}/`;
  return await securedPost(dispatch, apiEndpoint, postData, GET_ERRORS);
};

export const userStatus = (postData, setLoad, setError) => async (dispatch) => {
  const apiEndpoint = `/user/updateStatusMessage/`;
  return await securedPut(
    dispatch,
    apiEndpoint,
    postData,
    GET_ERRORS,
    setLoad,
    setError
  );
};

export const getVotes = (page) => async (dispatch) => {
  const apiEndpoint = `/user/vote/?page=${page}`;
  return await securedGet(dispatch, apiEndpoint, null, GET_VOTES);
};

export const updateDetails =
  (postData, setLoad, navigate) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);
      setLoad(true);
      axios
        .put(`/user/updateDetails/`, postData)
        .then((res) => {
          if (res.status === OK) {
            setLoad(false);
            navigate(`/`);
          }
        })
        .catch((error) => {
          setLoad(false);
          dispatch({
            type: GET_ERRORS,
            payload: error.response,
          });
        });
    });
  };

export const changePassword = (postData, setLoad) => async (dispatch) => {
  const apiEndpoint = `/user/changePassword/`;
  return await securedPut(dispatch, apiEndpoint, postData, GET_ERRORS, setLoad);
};

export const getActivity = (page, userName, setLoad) => async (dispatch) => {
  const apiEndpoint = `/user/activity/${userName}/?page=${page}`;
  return await securedGet(
    dispatch,
    apiEndpoint,
    null,
    GET_USER_ACTIVITY,
    setLoad
  );
};

export const feedback = (postData, setLoad) => async (dispatch) => {
  const apiEndpoint = `/feedback/create/`;
  return await securedPost(
    dispatch,
    apiEndpoint,
    postData,
    GET_ERRORS,
    setLoad
  );
};
