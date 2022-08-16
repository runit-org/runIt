import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Footer from "../SiteElements/footer";
import Login from "./log-in";
import SignUp from "./sign-up";

function Main() {
  return (
    <>
      <div id="auth-container">
        <div className="auth-content">
          <div>
            <h1 className="titleText text-center">eventmatcher</h1>
            {window.location.pathname === "/signup" ? <SignUp /> : <Login />}
          </div>
        </div>
        <div className="auth-footer">
          {window.location.pathname === "/signup" ? (
            <h6>
              Already have an account? <a href="/">Log in</a>
            </h6>
          ) : (
            <h6>
              Don't have an account? <a href="/signup">Sign Up</a>
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
