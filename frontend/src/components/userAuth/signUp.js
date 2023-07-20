import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../services/actions/securityActions";
import { useNavigate } from "react-router-dom";
import { FormButton } from "./utilities/auth-builder";
import { ResponseItem } from "../../layouts/responseItems";

function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [c_password, setc_Password] = useState({});
  const [load, setLoad] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState("");
  const [formSwitch, setFormSwitch] = useState(false);

  var apiStatus = useSelector((securityReducer) => securityReducer.security);

  useEffect(() => {
    if (apiStatus.userData) {
      setSignUpStatus(apiStatus.userData.success);
    }
  }, [apiStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSwitch(true);
    const userData = {
      username: username,
      email: email,
      password: password,
      c_password: c_password,
    };

    dispatch(createNewUser(userData, setLoad, navigate));
  };

  useEffect(() => {
    if (signUpStatus !== "true" && signUpStatus === undefined) {
      setFormSwitch(false);
    }
  }, [signUpStatus, navigate, apiStatus]);

  return (
    <>
      <fieldset disabled={formSwitch}>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <h4 className="subTitle">Create your account</h4>
          </div>
          <Row>
            <Form.Group as={Col} md="6" controlId="formBasicEmail1">
              <Form.Label className="text-muted small">Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              controlId="formBasicEmail2"
              className="mb-2"
            >
              <Form.Label className="text-muted small">Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-2">
              <Form.Label className="text-muted small">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasic_CPassword" className="mb-3">
              <Form.Label className="text-muted small">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setc_Password(e.target.value)}
                required
              />
            </Form.Group>
            <ResponseItem />
            <FormButton load={load} name="Continue" />
          </Row>
        </Form>
      </fieldset>
    </>
  );
}

export default SignUp;
