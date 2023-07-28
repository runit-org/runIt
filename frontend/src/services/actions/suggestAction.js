import axios from "axios";
import { refreshToken, setToken } from "../../securityUtils/setToken";
import { GET_ERRORS, GET_EVENT_SUGGESTIONS } from "../constants/types";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getSuggestions = (id, setIsLoading) => async (dispatch) => {
  setIsLoading(true);
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/event/createSuggestions/${id}/`)
      .then((res) => {
        dispatch({
          type: GET_EVENT_SUGGESTIONS,
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
