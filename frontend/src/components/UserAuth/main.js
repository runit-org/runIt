import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Footer from "../SiteElements/footer";
import Login from "./login";
import SignUp from "./sign-up";

function Main() {
  return (
    <>
      <Container id="auth-container">
        <Row> 
          <Col sm={6} className="centerContent" >
            <h1 className="titleText my-auto">Event Matcher</h1>
          </Col>
          <Col sm={6} className="centerContent">
            {window.location.pathname === "/signup" ? <SignUp /> : <Login />}
          </Col>
        </Row>
      </Container>

    <div  className="footer">
    <Footer /> 
    </div>
    </>
  );
}

export default Main;
