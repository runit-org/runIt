import axios from "axios";
import { GET_ALL_EVENTS, GET_ERRORS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

export const getAllEvents = () => async (dispatch) => {
  /* const ref = await axios
    .post("http://localhost:8000/api/auth/token/refresh/", {
      refresh: localStorage.getItem("token"),
    }) */
  const ref = await refreshToken().then((ref) => {
    console.log(ref.data.access);
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

  /* const res = await axios.get(`http://localhost:8000/api/event/all/`);
  dispatch({
    type: GET_ALL_EVENTS,
    payload: res.data,
  }); */
};

export const createNewEvent =
  (postData, setLoad, setError) => async (dispatch) => {
    /* const ref = await axios
      .post("http://localhost:8000/api/auth/token/refresh/", {
        refresh: localStorage.getItem("token"),
      }) */
    const ref = await refreshToken().then((ref) => {
      console.log(ref.data.access);
      setToken(ref.data.access);

      setLoad(true);
      const res = axios
        .post("http://localhost:8000/api/event/create/", postData)
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

          setError(error.response.data.message);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
          });
        });
    });

    /*  try {
    setLoad(true);
    const res = await axios.post("http://localhost:8000/api/event/create/", postData);
    console.log(res)
    if(res.data.success == "true"){
      setLoad(false)
      setShow(true)
      setError(res.data.message);
      window.location.reload();
    }
    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    });
  
  } catch (error) {
    setLoad(false);
    setShow(true);
    setError(error.response.data.message);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  } */
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
          console.log(error.response.data.message)
          setError(error.response.data.message);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
          });
        });
    });
  };
