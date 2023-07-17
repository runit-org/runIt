import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./layouts/header";
import Main from "./pages/main";
import { getAccessToken } from "./securityUtils/setToken";
import React, { lazy, Suspense } from "react";
import { ProtectedRoute } from "./routes/protected-route";
import { Spinner } from "react-bootstrap";
import UserContext from "./Context/user-context";
import SecurityContext from "./Context/security-context";
import Cookies from "js-cookie";
import CalendarContext from "./Context/calendar-context.js";
import { RoutesContainer } from "./routes/routes-container";

const ProfileDash = lazy(() => import("./pages/profile-dash"));
const SingleEventDash = lazy(() => import("./pages/single-event-dash"));
const EventsDash = lazy(() => import("./pages/events-dash"));

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
                <UserContext>
                  <Header />
                  <EventsDash />
                </UserContext>
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
                    <SingleEventDash />
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
