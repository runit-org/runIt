import axios from "axios";
import { GET_ALL_COMMENTS, GET_ERRORS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";
import * as ResponseStatus from "../constants/response-status";

export const createComment =
  (id, postData, setLoad, setError) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);

      setLoad(true);
      axios
        .post(`http://localhost:8000/api/event/comment/create/${id}/`, postData)
        .then((res) => {
          if (res.status === ResponseStatus.OK) {
            setLoad(false);
            setError(res.status);
          }
          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
        })
        .catch((error) => {
          setLoad(false);
          setError(error.response.data.message);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
          });
        });
    });
  };

export const removeComment = (id, setLoad, setError) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);

    setLoad(true);
    axios
      .delete(`http://localhost:8000/api/event/comment/delete/${id}/`)
      .then((res) => {
        if (res.status === ResponseStatus.OK) {
          setLoad(false);
          setError(res.data.message);
        }
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      })
      .catch((error) => {
        setLoad(false);
        setError(error.response.data.message);
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
      });
  });
};

export const updateComment = (id, postData) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);

    axios
      .put(`http://localhost:8000/api/event/comment/update/${id}/`, postData)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
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

export const getAllComments = (id, page) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/comment/show/${id}/?page=${page}`)
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
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .post(`http://localhost:8000/api/event/comment/likeUnlike/${id}/`)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};
