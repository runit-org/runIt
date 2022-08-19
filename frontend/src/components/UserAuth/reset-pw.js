import React, { useEffect, useState } from "react";
import { Card, Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../actions/securityActions";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../SiteElements/loader";
import ErrorToast from "../SiteElements/error-toast";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState("");
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

      <Card className="p-5 login-card" style={{ width: "28rem" }}>
        <fieldset disabled={formSwitch}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h4 className="subTitle">
              <span>Reset Password</span>
            </h4>
            <hr className="divider" />
            <Form.Label className="text-muted">Password</Form.Label>
            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={Object.keys(username).length !== 0 ? username : ""}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-muted">Confirm Password</Form.Label>
              <FloatingLabel
                controlId="confirmPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <div className="centerContent align-items-center">
              <Button type="submit" className="mb-2 mt-3 w-100">
                {(() => {
                  if (load) {
                    return <Loading />;
                  } else {
                    return <>Confirm</>;
                  }
                })()}
              </Button>
            </div>
            <Row className="mt-3">
              <Col className="text-center">
                <Link to="/">Log in</Link>
              </Col>
            </Row>
          </Form>
        </fieldset>
      </Card>
    </>
  );
}

export default ResetPassword;
