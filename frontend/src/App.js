import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthDash from "./pages/authDash";
import React, { lazy, Suspense } from "react";
import { ProtectedRoute } from "./routes/protectedRoute";
import { Spinner } from "react-bootstrap";
import SecurityContext from "./context/securityProvider";
import CalendarContext from "./context/calendarProvider.js";
import { RoutesContainer } from "./routes/routesContainer";
import Profile from "./pages/nested/profile";
import Stars from "./pages/nested/stars";
import Support from "./pages/nested/support";
import CalendarPage from "./pages/nested/calendar";
import Security from "./pages/nested/security";
import Login from "./components/userAuth/logIn";
import SignUp from "./components/userAuth/signUp";
import ResetPasswordEmail from "./components/userAuth/resetPwEmail";
import ResetPassword from "./components/userAuth/resetPw";
import VerifyEmail from "./components/userAuth/verifyEmail";
import NotFound from "./pages/notFound";
import {
  CALENDAR,
  EVENT,
  NOT_FOUND,
  POSTS,
  PROFILE,
  RESET_PW,
  RESET_PW_EMAIL,
  SECURITY,
  SETTINGS,
  SIGN_UP,
  STARS,
  SUPPORT,
  VERIFY,
} from "./routes/routes";
import "react-quill/dist/quill.snow.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
          {/* user auth routes */}
          <Route
            path="/"
            element={
              <>
                <AuthDash />
              </>
            }
          >
            <Route path="/" element={<Login />} />
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={RESET_PW_EMAIL} element={<ResetPasswordEmail />} />
            <Route path={`${RESET_PW}/:token`} element={<ResetPassword />} />
            <Route path={VERIFY} element={<VerifyEmail />} />
          </Route>

          {/* dash/posts routes */}
          <Route
            path={`/${POSTS}`}
            element={
              <ProtectedRoute>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <EventsDash />
                </LocalizationProvider>
              </ProtectedRoute>
            }
          />

          {/* profile routes */}
          <Route
            path={`/${PROFILE}`}
            element={
              <ProtectedRoute>
                <CalendarContext>
                  <ProfileDash />
                </CalendarContext>
              </ProtectedRoute>
            }
          >
            <Route path={CALENDAR} element={<CalendarPage />} />
            <Route path={SETTINGS} element={<Profile />} />
            <Route path={STARS} element={<Stars />} />
            <Route path={SECURITY} element={<Security />} />
            <Route path={SUPPORT} element={<Support />} />
          </Route>

          {/* event routes */}
          <Route
            path={`/${EVENT}/:id`}
            element={
              <ProtectedRoute>
                <SecurityContext>
                  <SingleEventDash />
                </SecurityContext>
              </ProtectedRoute>
            }
          />
          <Route
            path={`/${NOT_FOUND}`}
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={`/${NOT_FOUND}`} replace />} />
        </Routes>
      </RoutesContainer>
    </Suspense>
  );
}

export default App;
