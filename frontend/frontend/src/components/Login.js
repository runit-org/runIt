import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, login } from "../actions/securityActions";

function Login(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});

  /*   useEffect(()=>{
      dispatch(getUsers())
  }, []) */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginRequest = {
      username: username,
      password: password,
    };

    dispatch(login(LoginRequest));
  };
  /* const loginError = useSelector(errors => errors.errors.detail)
  if(loginError !== undefined){
    alert(loginError)
  } */

  return (
    <div>
      <div className="centerContent mt-5">
        <h1 className="title">Event Matcher</h1>
      </div>
      <div className="centerContent p-3">
        <Card>
          <h3 className="centerContent mt-3">Login</h3>
          <Form
            className="p-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Label className="text-muted">Email</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="username"
                  placeholder="name@example.com"
                  onChange={(e) => setUsername(e.target.value)}
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
                />
              </FloatingLabel>
            </Form.Group>
            <Row>
              <Col xs="auto">
                <Form.Check
                  type="checkbox"
                  id="autoSizingCheck"
                  className="mb-2 text-muted"
                  label="Remember me"
                />
              </Col>
              <Col xs="auto">
                <a href="#" className="mb-2">
                  Forgot Password
                </a>
              </Col>
            </Row>
            <div className="centerContent align-items-center">
              <Button type="submit" className="mb-2 mt-3 w-100">
                Login
              </Button>
            </div>
          </Form>
          <Card.Footer>
            <small className="centerContent align-items-center">
              New to the platform?&nbsp;<a href="#">Sign Up</a>
            </small>
          </Card.Footer>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
