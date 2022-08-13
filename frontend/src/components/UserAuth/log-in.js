import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/securityActions";
import { useNavigate } from "react-router-dom";
import Loading from "../SiteElements/loader";
import ErrorToast from "../SiteElements/error-toast";
import { useLocation } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState("... Join Us");
  const [formSwitch, setFormSwitch] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { id } = state;
      setSignupData(id.userData.data.username);
      setUsername(id.userData.data.username);
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginRequest = {
      username: username,
      password: password,
    };
    dispatch(login(LoginRequest, navigate, setLoad, setShow, setError));
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

  let errorVariant = {
    background: "#FFD2D2",
    color: "#D8000C",
  };
  return (
    <>
      <ErrorToast errors={error} showToast={show} variant={errorVariant} />

      <Card className="p-5  login-card">
        <fieldset disabled={formSwitch}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h4 className="subTitle">
              Hello&nbsp;
              <span style={{ color: "#5865f2" }}>{signupData}!</span>
            </h4>
            <hr className="divider" />
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
                  value={Object.keys(username).length !== 0 ? username : ""}
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
        </fieldset>
        <Card.Footer>
          <small className="centerContent mt-3">
            New to the platform?&nbsp;<a href="/signup">Sign Up</a>
          </small>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Login;