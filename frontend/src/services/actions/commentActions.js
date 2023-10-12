import { GET_ALL_COMMENTS, GET_SUCCESS } from "../constants/types";
import {
  securedDelete,
  securedGet,
  securedPost,
  securedPut,
} from "../../securityUtils/securedAxios";
import * as ApiTypes from "../constants/apiTypes";

const { CREATE_COMMENT, REACT_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT } =
  ApiTypes;

export const createComment = (id, postData, setLoad) => async (dispatch) => {
  const apiEndpoint = `/event/comment/create/${id}/`;
  return await securedPost(
    dispatch,
    apiEndpoint,
    postData,
    GET_SUCCESS,
    CREATE_COMMENT,
    setLoad
  );
};

export const removeComment = (id, setLoad, setError) => async (dispatch) => {
  const apiEndpoint = `/event/comment/delete/${id}/`;
  return await securedDelete(
    dispatch,
    apiEndpoint,
    null,
    GET_SUCCESS,
    REMOVE_COMMENT,
    setLoad,
    setError
  );
};

export const updateComment = (id, postData) => async (dispatch) => {
  const apiEndpoint = `/event/comment/update/${id}/`;
  return await securedPut(
    dispatch,
    apiEndpoint,
    postData,
    GET_SUCCESS,
    UPDATE_COMMENT
  );
};

export const getAllComments = (id, page) => async (dispatch) => {
  const apiEndpoint = `/event/comment/show/${id}/?page=${page}`;
  return await securedGet(dispatch, apiEndpoint, null, GET_ALL_COMMENTS);
};

export const likeUnlike = (id) => async (dispatch) => {
  const apiEndpoint = `/event/comment/likeUnlike/${id}/`;
  return await securedPost(
    dispatch,
    apiEndpoint,
    null,
    GET_SUCCESS,
    REACT_COMMENT
  );
};
