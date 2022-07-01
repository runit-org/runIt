import React, { useState, useEffect } from "react";
import { Card, Form, Row, Button, FloatingLabel } from "react-bootstrap";
import Footer from "../SiteElements/Footer";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import Loading from "../SiteElements/Loading";
import ErrorToast from "../SiteElements/ErrorToast";
import { useNavigate } from "react-router-dom";


function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState({});
  const [username, setUsername] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("false");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    dispatch(createNewUser(userData, setLoad, setShow, setError));
    setTimeout(() => {
      navigate("/signin", { replace: true });
    }, 3000)
  
  };

  var newUserStatus = useSelector(
    (securityReducer) => securityReducer.security
  );
  useEffect(() => {
    if (newUserStatus.userData != null) {
      if (Object.keys(newUserStatus.userData).length !== 0) {
        setSignUpStatus(newUserStatus.userData.success);
      } else {
        setSignUpStatus("false");
        console.log("false")
      }
    }
  }, [newUserStatus]);
  console.log(show)

  let successVariant = {
    background: "#DFF2BF",
    color: "#4F8A10",
  };
  let errorVariant = {
    background: "#FFD2D2",
    color: "#D8000C",
  };
  return (
    <div className="fullPage">
      <ErrorToast
        errors={error}
        showToast={show}
        variant={signUpStatus == "true" ? successVariant : errorVariant}
      />

      <Row className="centerContent p-3 login-card fullBody">
        <Card>
          <h3 className="centerContent mt-3">Create an account</h3>
          <Form
            className="p-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Label className="text-muted">Name</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Mac"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Label className="text-muted">Username</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail1">
              <FloatingLabel
                controlId="floatingInput1"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="mysticMac"
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
                  placeholder="mysticMac"
                  onChange={(e) => setEmail(e.target.value)}
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
          </Form>
          <Card.Footer>
            <small className="centerContent align-items-center">
              <a href="/signin">Already have an account?</a>
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

export default SignUp;
