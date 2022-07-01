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
import Login from "./components/UserAuth/Login";
import SignUp from "./components/UserAuth/SignUp";
import Header from "./components/SiteElements/Header";
import Posts from "./components/MainDash";
import { setToken, refreshToken } from "./securityUtils/setToken";
import jwt_decode from "jwt-decode";
// import { isExpired } from "react-jwt";
import { SET_CURRENT_USER, GET_ERRORS } from "./actions/types";

const token = localStorage.token;

const getAccessToken = async (token) => {
  const res = await refreshToken()
    .then((res) => {
      console.log(res);
      setToken(res.data.access);
      const decoded_token = jwt_decode(res.data.access);
      store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_token,
      });
    })
    .catch((error) => {
      store.dispatch({
        type: GET_ERRORS,
        payload: error.message,
      });
    });
};

if (token) {
  getAccessToken(token);
}

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
