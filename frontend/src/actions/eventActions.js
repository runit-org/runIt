import axios from "axios";
import { GET_ALL_EVENTS, GET_ERRORS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

/* const client = axios.create({
  baseURL: "http://localhost:8000/api/event",
}); */

export const getAllEvents = () => async (dispatch) => {
  const ref = await refreshToken().then((ref) => {
    //console.log(ref.data.access);
    setToken(ref.data.access);
    const res = axios
      .get(`http://localhost:8000/api/event/all/`)
      .then((res) => {
        dispatch({
          type: GET_ALL_EVENTS,
          payload: res.data,
        });
      });
  });
};

export const createNewEvent =
  (postData, setLoad, setError) => async (dispatch) => {
    const ref = await refreshToken().then((ref) => {
      //console.log(ref.data.access);
      setToken(ref.data.access);

      setLoad(true);
      const res = axios
        .post("http://localhost:8000/api/event/create/", postData)
        .then((res) => {
          //console.log(res);
          if (res.data.success == "true") {
            setLoad(false);
            setError(res.data.message);
            window.location.reload();
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

export const requestToJoin =
  (postData, setLoad, setError) => async (dispatch) => {
    const ref = await refreshToken().then((ref) => {
      console.log(ref.data.access);
      setToken(ref.data.access);

      setLoad(true);
      const res = axios
        .post("http://localhost:8000/api/event/member/requestJoin/", postData)
        .then((res) => {
          console.log(res);
          if (res.data.success == "true") {
            setLoad(false);
            setError(res.data.message);
            window.location.reload();
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

export const getEventMembers = (id, setMembers) => async (dispatch) => {
  const ref = await refreshToken().then((ref) => {
    setToken(ref.data.access);
    const res = axios
      .get(`http://localhost:8000/api/event/member/getMembers/${id}/`)
      .then((res) => {
        setMembers(res.data.data);
      });
  });
};

export const memberStatus = (postData, setLoad) => async (dispatch) => {
  const ref = await refreshToken().then((ref) => {
    setToken(ref.data.access);
    setLoad(true);
    const res = axios
      .post("http://localhost:8000/api/event/member/changeStatus/", postData)
      .then((res) => {
        console.log(res)
        if (res.data.success == "true") {
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
