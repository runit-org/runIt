import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/SiteElements/header";
import Main from "./components/UserAuth/main";
import { setToken, refreshToken } from "./securityUtils/setToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS } from "./actions/types";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/UserAuth/protected-route";

const ProfileDash = lazy(() => import("./components/Dashboards/profile-dash"));
const EventDash = lazy(() => import("./components/Dashboards/event-dash"));
const Posts = lazy(() => import("./components/Dashboards/main-dash"));

const token = localStorage.token;

const getAccessToken = async (token) => {
  await refreshToken()
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Main />} />
            <Route path="/reset-password/:token" element={<Main />} />
            <Route path="/reset-password-auth" element={<Main />} />

            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <Header />
                  <Posts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Header />
                  <ProfileDash />
                </ProtectedRoute>
              }
            />

            <Route
              path="/event/:id"
              element={
                <ProtectedRoute>
                  <Header />
                  <EventDash />
                </ProtectedRoute>
              }
            />

            {localStorage.getItem("token") ? (
              <Route path="*" element={<Navigate to="/posts" />} />
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
