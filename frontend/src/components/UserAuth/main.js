import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../SiteElements/footer";
import Login from "./log-in";
import ResetPassword from "./reset-pw";
import ResetPasswordEmail from "./resetPw-email";
import SignUp from "./sign-up";
import { useParams } from "react-router-dom";
import CurrentUser from "./current-user";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../../actions/userActions";

function Main() {
  let { token } = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [currUserProfile, setCurrUserProfile] = useState({});
  const localToken = localStorage.token;

  useEffect(() => {
    if (localToken && location.pathname === "/" && location.state === null)
      setIsValid(localToken);
  }, [localToken, location.pathname, location.state]);

  useEffect(() => {
    if (isValid) dispatch(getCurrentUserProfile());
  }, [dispatch, isValid]);

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile
  );

  var error = useSelector((errorReducer) => errorReducer.errors.status);

  useEffect(() => {
    if (isValid) {
      if (currProfile && !error) {
        setCurrUserProfile(currProfile.data);
      } else {
        localStorage.clear();
        navigate(0);
      }
    }
  }, [currProfile, error, navigate, isValid]);

  return (
    <>
      <div id="auth-container">
        <div className="auth-content">
          <div>
            {location.pathname === "/signup" ? (
              <SignUp />
            ) : location.pathname === "/reset-password-auth" ? (
              <ResetPasswordEmail />
            ) : location.pathname ===
              `/reset-password/${encodeURIComponent(token)}` ? (
              <ResetPassword token={encodeURIComponent(token)} />
            ) : isValid ? (
              <CurrentUser currUserProfile={currUserProfile} />
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
