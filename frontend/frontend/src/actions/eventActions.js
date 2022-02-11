import axios from "axios";
import { GET_ALL_EVENTS, } from "./types";

export const getAllEvents = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/event/all/`);
  dispatch({
    type: GET_ALL_EVENTS,
    payload: res.data,
  });
};



