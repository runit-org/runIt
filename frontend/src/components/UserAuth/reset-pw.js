import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPw } from "../../services/actions/securityActions";
import { Link } from "react-router-dom";
import { ResponseItem } from "../../layouts/response-items";

import { FormButton } from "./utilities/auth-builder";

function ResetPassword(props) {
  const dispatch = useDispatch();

  const [c_password, set_c_Password] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      password: password,
      c_password: c_password,
      token: props.token,
    };

    dispatch(resetPw(userData, setLoad));
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
          </div>

          <Form.Group className="mb-3" controlId="password">
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-muted visually-hidden">
              Confirm Password
            </Form.Label>

            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => set_c_Password(e.target.value)}
              required
            />
          </Form.Group>
          <ResponseItem />
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

export default ResetPassword;
