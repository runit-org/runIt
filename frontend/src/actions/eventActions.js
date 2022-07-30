import axios from "axios";
import { GET_ALL_EVENTS, GET_ERRORS, GET_AFFILIATED_EVENTS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

/* const client = axios.create({
  baseURL: "http://localhost:8000/api/event",
}); */

export const getAllEvents = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/all/`)
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

export const affiliatedEvents = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/affiliated/`)
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

export const createNewEvent =
  (postData, setLoad, setError) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);

      setLoad(true);
      axios
        .post("http://localhost:8000/api/event/create/", postData)
        .then((res) => {
          if (res.status === 200) {
            setLoad(false);
            setError(res.status);
            dispatch(getAllEvents());
            dispatch(affiliatedEvents());
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

export const updateEvent = (id, postData) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);

    axios
      .put(`http://localhost:8000/api/event/update/${id}/`, postData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllEvents());
        }
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

export const requestToJoin =
  (postData, setLoad, setError) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);

      setLoad(true);
      axios
        .post("http://localhost:8000/api/event/member/requestJoin/", postData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setLoad(false);
            setError(res.data.message);
            // dispatch(getAllEvents());
          }
          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
        })
        .catch((error) => {
          setLoad(false);
          console.log(error.response.data.message);
          setError(error.response.data.message);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
          });
        });
    });
  };

export const removeEvent = (id, setLoad, setError) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);

    setLoad(true);
    axios
      .delete(`http://localhost:8000/api/event/delete/${id}/`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoad(false);
          setError(res.data.message);
          dispatch(getAllEvents());
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

export const getEventMembers = (id, setMembers) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/member/getMembers/${id}/`)
      .then((res) => {
        setMembers(res.data.data);
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
        console.log(res);
        if (res.status === 200) {
          setLoad(false);
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
