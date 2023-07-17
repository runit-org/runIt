import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPwEmail } from "../../services/actions/securityActions";
import { Link } from "react-router-dom";
import { ResponseItem } from "../../layouts/response-items";
import { FormButton } from "./utilities/auth-builder";

function ResetPasswordEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({});
  const [load, setLoad] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
    };

    dispatch(resetPwEmail(userData, setLoad));
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

  return (
    <>
      <fieldset disabled={formSwitch}>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <h4 className="subTitle">Reset Password</h4>
            <ResponseItem />
          </div>

          <Form.Label className="text-muted visually-hidden">Email</Form.Label>
          <Form.Group controlId="formBasicEmail2">
            <Form.Control
              className="p-2"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <FormButton load={load} name="Confirm" />
          <hr className="divider" />
          <Row className="mt-3">
            <Col className="text-center">
              <Link to="/">Return to log in</Link>
            </Col>
          </Row>
        </Form>
      </fieldset>
    </>
  );
}

export default ResetPasswordEmail;
