import React, { useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Footer from "../SiteElements/Footer";
import { useDispatch } from "react-redux";
import { login } from "../../actions/securityActions";
import { useNavigate } from "react-router-dom";
import Loading from "../SiteElements/Loading";
import ErrorToast from "../SiteElements/ErrorToast";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginRequest = {
      username: username,
      password: password,
    };

    dispatch(login(LoginRequest, navigate, setLoad, setShow, setError));
  };
  let errorVariant = {
    background: "#FFD2D2", 
    color: "#D8000C", 
  }
  return (
    <div className="fullPage">
      <ErrorToast errors={error} showToast={show} variant={errorVariant} />
      <Row className="centerContent p-3 login-card fullBody">
        {/* <div className="centerContent mt-5">
        <h1 className="title">Event Matcher</h1>
      </div> */}
        <Card>
          <h3 className="centerContent mt-3">Welcome Back!</h3>
          <Form
            className="p-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Label className="text-muted">Username</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="username"
                  placeholder="mysticMac"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-muted">Password</Form.Label>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Row className="mb-2">
              <Col>
                <Form.Check
                  type="checkbox"
                  id="autoSizingCheck"
                  className="text-muted"
                  label="Remember me"
                />
              </Col>
              <Col className="text-end">
                <a href="#">Forgot Password</a>
              </Col>
            </Row>
            <div className="centerContent align-items-center">
              <Button type="submit" className="mb-2 mt-3 w-100">
                {(() => {
                  if (load) {
                    return <Loading />;
                  } else {
                    return <>Login</>;
                  }
                })()}
              </Button>
            </div>
          </Form>
          <Card.Footer >
            <small className="centerContent align-items-center">
              New to the platform?&nbsp;<a href="/signup">Sign Up</a>
            </small>
          </Card.Footer>
        </Card>
      </Row>
      <Row className="footer-section">
        <Footer />
      </Row>
    </div>
  );
}

export default Login;
