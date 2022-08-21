import React from "react";
import { Link } from "react-router-dom";
import Footer from "../SiteElements/footer";
import Login from "./log-in";
import ResetPassword from "./reset-pw";
import ResetPasswordEmail from "./resetPw-email";
import SignUp from "./sign-up";
import { useParams } from "react-router-dom";

function Main() {
  let { token } = useParams();

  return (
    <>
      <div id="auth-container">
        <div className="auth-content">
          <div>
            <h1 className="titleText text-center">eventmatcher</h1>
            {window.location.pathname === "/signup" ? (
              <SignUp />
            ) : window.location.pathname === "/reset-password-auth" ? (
              <ResetPasswordEmail />
            ) : window.location.pathname ===
              `/reset-password/${encodeURIComponent(token)}` ? (
              <ResetPassword token={encodeURIComponent(token)} />
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
