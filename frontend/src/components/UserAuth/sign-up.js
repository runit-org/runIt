import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import ErrorToast from "../SiteElements/error-toast";
import { useNavigate } from "react-router-dom";
import { MsgToast } from "../SiteElements/msg-toast";
import { FormButton } from "./utilities/auth-builder";

function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState({});
  const [username, setUsername] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [c_password, setc_Password] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
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
      name: name,
      username: username,
      email: email,
      password: password,
      c_password: c_password,
    };

    dispatch(createNewUser(userData, setLoad, setShow, navigate));
  };

  useEffect(() => {
    if (signUpStatus !== "true" && signUpStatus === undefined) {
      setFormSwitch(false);
    }
  }, [signUpStatus, navigate, apiStatus]);

  return (
    <>
      <ErrorToast
        showToast={show}
        variant={
          signUpStatus === "true"
            ? MsgToast().successVariant
            : MsgToast().errorVariant
        }
      />

      <fieldset disabled={formSwitch}>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <h4 className="subTitle">Create an account</h4>
          </div>
          <Row>
            <Form.Group
              as={Col}
              md="6"
              controlId="formBasicEmail"
              className="mb-3"
            >
              <Form.Label className="text-muted visually-hidden">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              controlId="formBasicEmail1"
              className="mb-3"
            >
              <Form.Label className="text-muted visually-hidden">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail2" className="mb-3">
              <Form.Label className="text-muted visually-hidden">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
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

            <Form.Group controlId="formBasic_CPassword">
              <Form.Label className="text-muted visually-hidden">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setc_Password(e.target.value)}
                required
              />
            </Form.Group>
            <FormButton load={load} name="Continue" />
          </Row>
        </Form>
      </fieldset>
    </>
  );
}

export default SignUp;
