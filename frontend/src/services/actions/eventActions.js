import axios from "axios";
import {
  GET_ALL_EVENTS,
  GET_ERRORS,
  GET_AFFILIATED_EVENTS,
  GET_EVENT_MEMBERS,
  GET_SINGLE_EVENT,
} from "../constants/types";
import { setToken, refreshToken } from "../../securityUtils/setToken";
import * as ResponseStatus from "../constants/responseStatus";
import {
  securedDelete,
  securedGet,
  securedPatch,
  securedPost,
  securedPut,
} from "../../securityUtils/securedAxios";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getSingleEvent = (id) => async (dispatch) => {
  const apiEndpoint = `/event/view/${id}/`;
  return await securedGet(dispatch, apiEndpoint, null, GET_SINGLE_EVENT);
};

export const getAllEvents = (page) => async (dispatch) => {
  const apiEndpoint = `/event/all/?page=${page}`;
  return await securedGet(dispatch, apiEndpoint, null, GET_ALL_EVENTS);
};

export const affiliatedEvents = (filter) => async (dispatch) => {
  const apiEndpoint = `/event/affiliated/${
    filter ? `?filter=status-${filter}` : ""
  }`;
  return await securedGet(dispatch, apiEndpoint, null, GET_AFFILIATED_EVENTS);
};

export const createNewEvent = (postData, setFormStatus) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    setFormStatus({ load: true });
    return axios
      .post("/event/create/", postData)
      .then((res) => {
        if (res.status === ResponseStatus.OK) {
          setFormStatus({ load: false, error: res.status });
        }
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
        return res;
      })
      .catch((error) => {
        setFormStatus({ load: false, error: error.response.data.message });
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        return error;
      });
  });
};

export const updateEvent = (id, postData) => async (dispatch) => {
  const apiEndpoint = `/event/update/${id}/`;
  return await securedPut(dispatch, apiEndpoint, postData, GET_ERRORS);
};

export const updateStatus =
  (id, postData, setLoad, setError) => async (dispatch) => {
    const apiEndpoint = `/event/updateStatus/${id}/`;
    return await securedPatch(
      dispatch,
      apiEndpoint,
      postData,
      GET_ERRORS,
      setLoad,
      setError
    );
  };

export const requestToJoin =
  (postData, setLoad, setError) => async (dispatch) => {
    const apiEndpoint = `/event/member/requestJoin/`;
    return await securedPost(
      dispatch,
      apiEndpoint,
      postData,
      GET_ERRORS,
      setLoad,
      setError
    );
  };

export const removeEvent = (id, setLoad, setError) => async (dispatch) => {
  const apiEndpoint = `/event/delete/${id}/`;
  return await securedDelete(
    dispatch,
    apiEndpoint,
    null,
    GET_ERRORS,
    setLoad,
    setError
  );
};

export const getEventMembers = (id) => async (dispatch) => {
  const apiEndpoint = `/event/member/getMembers/${id}/`;
  return await securedGet(dispatch, apiEndpoint, null, GET_EVENT_MEMBERS);
};

export const memberStatus = (postData, setLoad) => async (dispatch) => {
  const apiEndpoint = `/event/member/changeStatus/`;
  return await securedPost(
    dispatch,
    apiEndpoint,
    postData,
    GET_ERRORS,
    setLoad
  ).then(({ status }) => {
    if (status === ResponseStatus.OK) {
      dispatch(getEventMembers(postData.eventId));
    }
  });
};
