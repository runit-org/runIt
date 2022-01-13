import axios from "axios";
import {
  GET_USERS,
} from "./types";
import jwt_decode from "jwt-decode";



export const getUsers = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/user/all/`);
  // console.log(res)
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

