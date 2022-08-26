import React, { useEffect, useState } from "react";
import { Card, Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPwEmail } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import Loading from "../SiteElements/loader";
import ErrorToast from "../SiteElements/error-toast";
import { MsgToast } from "../SiteElements/msg-toast";

function ResetPasswordEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
    };

    dispatch(resetPwEmail(userData, setLoad, setShow));
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

  return (
    <>
      <ErrorToast showToast={show} variant={MsgToast().successVariant} />

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

export default ResetPasswordEmail;
