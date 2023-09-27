import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import AuthDash from "./pages/authDash";
import React, { lazy, Suspense } from "react";
import { ProtectedRoute } from "./routes/protectedRoute";
import { Spinner } from "react-bootstrap";
import SecurityContext from "./context/securityProvider";
import CalendarContext from "./context/calendarProvider.js";
import { RoutesContainer } from "./routes/routesContainer";
import Profile from "./pages/nested/profile";
import History from "./pages/nested/history";
import Support from "./pages/nested/support";
import CalendarPage from "./pages/nested/calendar";
import Security from "./pages/nested/security";
import Login from "./components/userAuth/logIn";
import SignUp from "./components/userAuth/signUp";
import ResetPasswordEmail from "./components/userAuth/resetPwEmail";
import ResetPassword from "./components/userAuth/resetPw";
import VerifyEmail from "./components/userAuth/verifyEmail";
import NotFound from "./pages/notFound";
// import UnverifiedDash from "./pages/unverifiedDash";
// import Cookies from "js-cookie";

const ProfileDash = lazy(() => import("./pages/profileDash"));
const SingleEventDash = lazy(() => import("./pages/singleEventDash"));
const EventsDash = lazy(() => import("./pages/eventsDash"));

function App() {
  let { token } = useParams();
  // const isVerified = Cookies.get("isVerified");
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
            <Route path="signup" element={<SignUp />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordEmail />}
            />
            <Route
              path="reset-password-auth"
              element={<ResetPassword token={encodeURIComponent(token)} />}
            />
            <Route path="verify" element={<VerifyEmail />} />
          </Route>

          {/* dash/posts routes */}
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                {/* {isVerified === "true" ? <EventsDash /> : <UnverifiedDash />} */}
                <EventsDash />
              </ProtectedRoute>
            }
          />

          {/* profile routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <CalendarContext>
                  <ProfileDash />
                </CalendarContext>
              </ProtectedRoute>
            }
          >
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="settings" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="security" element={<Security />} />
            <Route path="feedback-support" element={<Support />} />
          </Route>

          {/* event routes */}
          <Route
            path="/event/:id"
            element={
              <ProtectedRoute>
                <SecurityContext>
                  <SingleEventDash />
                </SecurityContext>
              </ProtectedRoute>
            }
          />
          <Route
            path="/404"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </RoutesContainer>
    </Suspense>
  );
}

export default App;
