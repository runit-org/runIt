import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, login } from "../actions/securityActions";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [loginError, setLoginError] = useState(false);

  /*   useEffect(()=>{
      dispatch(getUsers())
  }, []) */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginRequest = {
      username: username,
      password: password,
    };

    dispatch(login(LoginRequest, navigate));
  };
  /* var data = useSelector((securityReducer) => securityReducer.errors.detail);
  useEffect(() => {
    if(data != null){
      setLoginError(true);
    }
  }, [data]);

  if(loginError){
  alert(loginError)
  }
 */
  return (
    <div className="centerContent mt-5 p-3 login-card">
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
      <Footer />
    </div>
  );
}

export default Login;
