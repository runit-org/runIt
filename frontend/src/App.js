import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Header from "./layouts/header";
import AuthDash from "./pages/authDash";
import React, { lazy, Suspense } from "react";
import { ProtectedRoute } from "./routes/protectedRoute";
import { Spinner } from "react-bootstrap";
import UserContext from "./context/userProvider";
import SecurityContext from "./context/securityProvider";
import CalendarContext from "./context/calendarProvider.js";
import { RoutesContainer } from "./routes/routesContainer";
import Profile from "./pages/nested/profile";
import History from "./pages/nested/history";
import Support from "./pages/nested/support";
import CalendarPage from "./pages/nested/calendar";
import Security from "./pages/nested/security";

const ProfileDash = lazy(() => import("./pages/profileDash"));
const SingleEventDash = lazy(() => import("./pages/singleEventDash"));
const EventsDash = lazy(() => import("./pages/eventsDash"));

function App() {
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
          <Route path="/" element={<AuthDash />} />
          <Route path="/signup" element={<AuthDash />} />
          <Route path="/reset-password/:token" element={<AuthDash />} />
          <Route path="/reset-password-auth" element={<AuthDash />} />

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
          >
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="settings" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="security" element={<Security />} />
            <Route path="feedback-support" element={<Support />} />
          </Route>

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
        </Routes>
      </RoutesContainer>
    </Suspense>
  );
}

export default App;
