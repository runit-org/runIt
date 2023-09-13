import axios from "axios";
import { GET_ALL_COMMENTS, GET_ERRORS } from "../constants/types";
import { setToken, refreshToken } from "../../securityUtils/setToken";
import * as ResponseStatus from "../constants/responseStatus";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const createComment =
  (id, postData, setLoad, setError) => async (dispatch) => {
    return await refreshToken().then(async (ref) => {
      setToken(ref.data.access);
      setLoad(true);
      return axios
        .post(`/event/comment/create/${id}/`, postData)
        .then((res) => {
          if (res.status === ResponseStatus.OK) {
            setLoad(false);
            setError(res.status);
          }
          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
          return res;
        })
        .catch((error) => {
          setLoad(false);
          setError(error.response.data.message);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
          });
          return error;
        });
    });
  };

export const removeComment = (id, setLoad, setError) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    setLoad(true);
    try {
      const res = await axios.delete(`/event/comment/delete/${id}/`);
      if (res.status === ResponseStatus.OK) {
        setLoad(false);
        setError(res.data);
      }
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
      return res;
    } catch (error) {
      setLoad(false);
      setError(error.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: error.response,
      });
      return error;
    }
  });
};

export const updateComment = (id, postData) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    return axios
      .put(`/event/comment/update/${id}/`, postData)
      .then((res) => {
        if (res.status === ResponseStatus.OK) {
          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
        }
        return res;
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        return error;
      });
  });
};

export const getAllComments = (id, page) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/event/comment/show/${id}/?page=${page}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_COMMENTS,
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

export const likeUnlike = (id) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    return axios
      .post(`/event/comment/likeUnlike/${id}/`)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: res,
        });
        return res;
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        return error;
      });
  });
};
