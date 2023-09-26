import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPw } from "../../services/actions/securityActions";
import { Link } from "react-router-dom";
import { ResponseItem } from "../../layouts/responseItems";

import { FormButton } from "./helper/auth-builder";
import { useHandleChange } from "../../hooks/useHandleChange";
import { FormGroup, FormLabel } from "../../layouts/customForm";

function ResetPassword(props) {
  const dispatch = useDispatch();

  const { formValue, handleFieldChange } = useHandleChange({
    password: "",
    c_password: "",
    token: props.token,
  });
  const [load, setLoad] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(resetPw(formValue, setLoad));
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);
  console.log(formValue);
  return (
    <fieldset disabled={formSwitch}>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-4">
          <h4 className="subTitle">Reset your password</h4>
        </div>

        <FormGroup formId="password">
          <FormLabel>Password</FormLabel>
          <Form.Control
            type="password"
            name="password"
            onChange={handleFieldChange}
            required
          />
        </FormGroup>

        <FormGroup formId="formBasicPassword">
          <FormLabel>Confirm Password</FormLabel>

          <Form.Control
            type="password"
            name="c_password"
            onChange={handleFieldChange}
            required
          />
        </FormGroup>
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
  );
}

export default ResetPassword;
