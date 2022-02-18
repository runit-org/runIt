import axios from "axios";
import { GET_ALL_EVENTS,  GET_ERRORS } from "./types";

export const getAllEvents = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/event/all/`);
  dispatch({
    type: GET_ALL_EVENTS,
    payload: res.data,
  });
};

export const createNewEvent = (postData, setLoad, setShow, setError) => async (dispatch) => {
  try {
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
  }
};



