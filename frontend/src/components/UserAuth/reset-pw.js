import React, { useEffect, useState } from "react";
import { Card, Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPw } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import Loading from "../SiteElements/loader";
import ErrorToast from "../SiteElements/error-toast";

function ResetPassword(props) {
  const dispatch = useDispatch();
  const [c_password, set_c_Password] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [formSwitch, setFormSwitch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      password: password,
      c_password: c_password,
      token: props.token,
    };

    dispatch(resetPw(userData, setLoad, setShow, setError));
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
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => set_c_Password(e.target.value)}
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
                <Link to="/">Return to log in</Link>
              </Col>
            </Row>
          </Form>
        </fieldset>
      </Card>
    </>
  );
}

export default ResetPassword;
