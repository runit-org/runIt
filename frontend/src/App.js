import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Header from "./layouts/header";
import Main from "./pages/main";
import React, { lazy, Suspense } from "react";
import { ProtectedRoute } from "./routes/protectedRoute";
import { Spinner } from "react-bootstrap";
import UserContext from "./context/userProvider";
import SecurityContext from "./context/securityProvider";
import CalendarContext from "./context/calendarProvider.js";
import { RoutesContainer } from "./routes/routesContainer";

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
          >
            <Route
              path="calendar"
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
              path="settings"
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
              path="history"
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
              path="feedback-support"
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
