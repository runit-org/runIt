import axios from "axios";

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const refreshToken = () => {
  const ref =  axios
    .post("http://localhost:8000/api/auth/token/refresh/", {
      refresh: localStorage.getItem("token"),
    })
    return ref
};

export  {setToken, refreshToken};
