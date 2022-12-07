import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../actions/securityActions";
import { Link, useNavigate } from "react-router-dom";
import ErrorToast from "../SiteElements/error-toast";
import { useLocation } from "react-router-dom";
import { MsgToast } from "../SiteElements/msg-toast";
import { FormButton } from "./utilities/auth-builder";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [signupData, setSignupData] = useState("");
  const [formSwitch, setFormSwitch] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { id } = state;
      setSignupData(id.data.username);
      setUsername(id.data.username);
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginRequest = {
      username: username,
      password: password,
    };
    dispatch(login(LoginRequest, navigate, setLoad, setShow));
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

  return (
    <>
      <ErrorToast showToast={show} variant={MsgToast().errorVariant} />

      <Card className="p-5 login-card" style={{ width: "28rem" }}>
        <fieldset disabled={formSwitch}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h4 className="subTitle">
              {signupData !== "" ? (
                <span>
                  welcome{" "}
                  <span style={{ color: "#5865f2" }}>{signupData}!</span>
                </span>
              ) : (
                <span>Log in</span>
              )}
            </h4>
            <hr className="divider" />
            <Form.Label className="text-muted visually-hidden">
              Username
            </Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="username"
                placeholder="Username"
                value={Object.keys(username).length !== 0 ? username : ""}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-muted visually-hidden">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <FormButton load={load} name="Login" />
            <Row className="mt-3">
              <Col className="text-center">
                <Link to="/reset-password-auth">Forgot Password?</Link>
              </Col>
            </Row>
          </Form>
        </fieldset>
      </Card>
    </>
  );
}

export default Login;
