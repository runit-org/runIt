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

export const getSingleEvent = (id) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/view/${id}/`)
      .then((res) => {
        dispatch({
          type: GET_SINGLE_EVENT,
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

export const getAllEvents = (id) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/all/?page=${id}`)
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

export const affiliatedEvents = (id) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/affiliated/?page=${id}`)
      .then((res) => {
        dispatch({
          type: GET_AFFILIATED_EVENTS,
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

export const createNewEvent = (postData, setFormStatus) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    setFormStatus({ load: true });
    axios
      .post("http://localhost:8000/api/event/create/", postData)
      .then((res) => {
        if (res.status === ResponseStatus.OK) {
          setFormStatus({ load: false, error: res.status });
        }
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      })
      .catch((error) => {
        setFormStatus({ load: false, error: error.response.data.message });
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};

export const updateEvent = (id, postData) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .put(`http://localhost:8000/api/event/update/${id}/`, postData)
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

export const updateStatus =
  (id, postData, setLoad, setError) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);
      setLoad(true);
      axios
        .patch(`http://localhost:8000/api/event/updateStatus/${id}/`, postData)
        .then((res) => {
          if (res.status === ResponseStatus.OK) {
            setLoad(false);
            setError(res.data);
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
            payload: error.response.data,
          });
        });
    });
  };

export const requestToJoin =
  (postData, setLoad, setError) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);

      setLoad(true);
      axios
        .post("http://localhost:8000/api/event/member/requestJoin/", postData)
        .then((res) => {
          if (res.status === ResponseStatus.OK) {
            setLoad(false);
            setError(res.data);
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
            payload: error.response.data,
          });
        });
    });
  };

export const removeEvent =
  (id, setLoad, setError, navigate) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);

      setLoad(true);
      axios
        .delete(`http://localhost:8000/api/event/delete/${id}/`)
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
      axios
        .get(`http://localhost:8000/api/event/member/getMembers/${id}/`)
        .then((res) => {
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
      .post("http://localhost:8000/api/event/member/changeStatus/", postData)
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