import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../layouts/footer";
import SingleClick from "../components/userAuth/singleClick";
import { Card } from "react-bootstrap";
import { AppLogo } from "../layouts/icons";
import { useCurrentPath } from "../hooks/useCurrentPath";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { CurrAuthUser } from "../routes/currentUserRoute";

function Main() {
  const currPath = useCurrentPath();
  const isValid = useAuthStatus();

  return (
    <>
      <div id="auth-container">
        <div className="auth-content">
          <Card
            className="login-card"
            style={currPath !== "/signup" ? { width: "28rem" } : {}}
          >
            {!isValid ? <AppLogo w={"80px"} defClass="mb-4" /> : ""}

            {isValid ? (
              <CurrAuthUser>
                <SingleClick currUserProfile={CurrAuthUser.currUserProfile} />
              </CurrAuthUser>
            ) : (
              <Outlet />
            )}
          </Card>
        </div>
        <div className="auth-footer">
          {currPath === "/signup" ? (
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
