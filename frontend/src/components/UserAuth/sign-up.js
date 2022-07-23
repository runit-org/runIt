import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import Loading from "../SiteElements/loading";
import ErrorToast from "../SiteElements/error-toast";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("");
  const [formSwitch, setFormSwitch] = useState(false);

  var newUserStatus = useSelector(
    (securityReducer) => securityReducer.security
  );

  useEffect(() => {
    if (newUserStatus.userData) {
      setSignUpStatus(newUserStatus.userData.success);
    }
  }, [newUserStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      username: username,
      email: email,
      password: password,
      c_password: c_password,
    };

    dispatch(createNewUser(userData, setLoad, setShow, setError));
  };

  useEffect(() => {
    if (signUpStatus == "true") {
      setFormSwitch(true);
      setTimeout(() => {
        navigate("/", { replace: true, state: { id: newUserStatus } });
      }, 3000);
    }
  }, [signUpStatus]);

  let successVariant = {
    background: "#DFF2BF",
    color: "#4F8A10",
  };
  let errorVariant = {
    background: "#FFD2D2",
    color: "#D8000C",
  };
  return (
    <>
      <ErrorToast
        errors={error.message}
        showToast={show}
        variant={signUpStatus === "true" ? successVariant : errorVariant}
      />

      <Card className="p-5 login-card">
        <fieldset disabled={formSwitch}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {" "}
            <h4 className="subTitle">Create an account</h4>
            <hr className="divider"/>
            <Row>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label className="text-muted">Name</Form.Label>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicEmail1"
              >
                <Form.Label className="text-muted">Username</Form.Label>

                <FloatingLabel
                  controlId="floatingInput1"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Label className="text-muted">Email</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicEmail2">
                <FloatingLabel
                  controlId="floatingInput2"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicPassword"
              >
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

              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label className="text-muted">Confirm Password</Form.Label>
                <FloatingLabel
                  controlId="floating_c_Password"
                  label="Confirm Password"
                >
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setc_Password(e.target.value)}
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
                      return <>Continue</>;
                    }
                  })()}
                </Button>
              </div>
            </Row>
          </Form>
        </fieldset>
        <Card.Footer>
          <small className="centerContent mt-3">
            <a href="/">Already have an account?</a>
          </small>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SignUp;
