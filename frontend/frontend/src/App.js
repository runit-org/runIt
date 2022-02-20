import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import store from "./store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Posts from "./components/Posts";
import setToken from "./securityUtils/setToken";
import jwt_decode from "jwt-decode";
import { isExpired } from "react-jwt";
import { SET_CURRENT_USER, GET_ERRORS } from "./actions/types";
import axios from "axios";

const token = localStorage.token;

/* const isMyTokenExpired = isExpired(token);
console.log(isMyTokenExpired) */

const getAccessToken = async (token) => {
  try {
    const refToken = {
      refresh: token,
    };
    const res = await axios.post(
      "http://localhost:8000/api/auth/token/refresh/",
      refToken
    );
    setToken(res.data.access);
    const decoded_token = jwt_decode(res.data.access);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded_token,
    });
  } catch (error) {
    store.dispatch({
      type: GET_ERRORS,
      payload: error.message,
    });
  }
};

if (token /* && !isMyTokenExpired */) {
  getAccessToken(token);
} /* else {
  localStorage.clear();
  if (!window.location.hash) {
    window.location = window.location + "#session";
    window.location.reload();
  } 
}*/

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Header />
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
