import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../SiteElements/footer";
import Login from "./log-in";
import ResetPassword from "./reset-pw";
import ResetPasswordEmail from "./resetPw-email";
import SignUp from "./sign-up";
import { useParams } from "react-router-dom";
import CurrentUser from "./current-user";

function Main() {
  let { token } = useParams();
  let location = useLocation();
  const [isValid, setIsValid] = useState(false);
  const localToken = localStorage.token;

  useEffect(() => {
    setIsValid(localToken);
  }, [localToken]);

  return (
    <>
      <div id="auth-container">
        <div className="auth-content">
          <div>
            <h1 className="titleText text-center">eventmatcher</h1>
            {location.pathname === "/signup" ? (
              <SignUp />
            ) : location.pathname === "/reset-password-auth" ? (
              <ResetPasswordEmail />
            ) : location.pathname ===
              `/reset-password/${encodeURIComponent(token)}` ? (
              <ResetPassword token={encodeURIComponent(token)} />
            ) : isValid &&
              location.pathname === "/" &&
              location.state === null ? (
              <CurrentUser />
            ) : (
              <Login />
            )}
          </div>
        </div>
        <div className="auth-footer">
          {window.location.pathname === "/signup" ? (
            <h6>
              Already have an account? <Link to="/">Log in</Link>
            </h6>
          ) : (
            <h6>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </h6>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Main;
