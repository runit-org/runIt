import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./layouts/header";
import Main from "./components/UserAuth/main";
import { getAccessToken } from "./securityUtils/setToken";
import React, { lazy, Suspense } from "react";
import ProtectedRoute from "./components/UserAuth/protected-route";
import { Spinner } from "react-bootstrap";
import UserContext from "./components/Context/user-context";
import SecurityContext from "./components/Context/security-context";
import Cookies from "js-cookie";
import ResponseContext from "./components/Context/response-context";
import CalendarContext from "./components/Context/calendar-context.js";

const ProfileDash = lazy(() => import("./components/Dashboards/profile-dash"));
const EventDash = lazy(() => import("./components/Dashboards/event-dash"));
const Posts = lazy(() => import("./components/Dashboards/main-dash"));

const RoutesContainer = ({ children }) => {
  const path = useLocation().pathname;
  return (
    <React.Fragment>
      {["/", "/signup", "/reset-password/", "/reset-password-auth"].some((el) =>
        path.includes(el)
      ) ? (
        <ResponseContext>{children}</ResponseContext>
      ) : null}
    </React.Fragment>
  );
};

function App() {
  const token = Cookies.get("token");

  if (token) {
    getAccessToken();
  }

  return (
    <Suspense
      fallback={
        <div className="auth-content">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
    >
      <RoutesContainer>
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
                <UserContext>
                  <CalendarContext>
                    <Header />
                    <ProfileDash />
                  </CalendarContext>
                </UserContext>
              </ProtectedRoute>
            }
          />

          <Route
            path="/event/:id"
            element={
              <ProtectedRoute>
                <SecurityContext>
                  <UserContext>
                    <Header />
                    <EventDash />
                  </UserContext>
                </SecurityContext>
              </ProtectedRoute>
            }
          />

          {token ? (
            <Route path="*" element={<Navigate to="/posts" />} />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </RoutesContainer>
    </Suspense>
  );
}

export default App;
