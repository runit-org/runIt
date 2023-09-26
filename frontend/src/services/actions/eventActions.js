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

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getSingleEvent = (id) => async (dispatch) => {
  return await refreshToken().then((ref) => {
    setToken(ref.data.access);
    return axios
      .get(`/event/view/${id}/`)
      .then((res) => {
        dispatch({
          type: GET_SINGLE_EVENT,
          payload: res.data,
        });
        return res;
      })

      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        return error.response;
      });
  });
};

export const getAllEvents = (id) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/event/all/?page=${id}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_EVENTS,
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

export const affiliatedEvents = (filter) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/event/affiliated/${filter ? `?filter=status-${filter}` : ""}`)
      .then((res) => {
        if (res.status === ResponseStatus.OK) {
          dispatch({
            type: GET_AFFILIATED_EVENTS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
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
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    return axios
      .put(`/event/update/${id}/`, postData)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
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

export const updateStatus =
  (id, postData, setLoad, setError) => async (dispatch) => {
    return await refreshToken().then(async (ref) => {
      setToken(ref.data.access);
      setLoad(true);
      return axios
        .patch(`/event/updateStatus/${id}/`, postData)
        .then((res) => {
          if (res.status === ResponseStatus.OK) {
            setLoad(false);
            setError(res.data);
          }

          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
          return res;
        })
        .catch((error) => {
          setLoad(false);
          setError(error.response.data);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
          });
          return error;
        });
    });
  };

export const requestToJoin =
  (postData, setLoad, setError) => async (dispatch) => {
    return await refreshToken().then(async (ref) => {
      setToken(ref.data.access);
      setLoad(true);
      return axios
        .post("/event/member/requestJoin/", postData)
        .then((res) => {
          if (res.status === ResponseStatus.OK) {
            setLoad(false);
            setError(res.data);
          }
          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
          return res;
        })
        .catch((error) => {
          setLoad(false);
          setError(error.response.data);
          dispatch({
            type: GET_ERRORS,
            payload: error.response,
          });

          return error;
        });
    });
  };

export const removeEvent =
  (id, setLoad, setError, navigate) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);
      setLoad(true);
      axios
        .delete(`/event/delete/${id}/`)
        .then((res) => {
          if (res.status === ResponseStatus.OK) {
            setLoad(false);
            setError(res.data);
            navigate(`/posts`);
          }

          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
        })
        .catch((error) => {
          setLoad(false);
          setError(error.response.data);
          dispatch({
            type: GET_ERRORS,
            payload: error.response,
          });
        });
    });
  };

export const getEventMembers = (id) => async (dispatch) => {
  await refreshToken()
    .then((ref) => {
      setToken(ref.data.access);
      axios.get(`/event/member/getMembers/${id}/`).then((res) => {
        dispatch({
          type: GET_EVENT_MEMBERS,
          payload: res.data,
        });
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const memberStatus = (postData, setLoad) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    setLoad(true);
    axios
      .post("/event/member/changeStatus/", postData)
      .then((res) => {
        if (res.status === ResponseStatus.OK) {
          setLoad(false);
          dispatch(getEventMembers(postData.eventId));
        }

        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      })
      .catch((error) => {
        setLoad(false);
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};
