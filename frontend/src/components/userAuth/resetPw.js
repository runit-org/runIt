import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPw } from "../../services/actions/securityActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ResponseItem } from "../../layouts/responseItems";

import { FormButton } from "./helper/auth-builder";
import { useHandleChange } from "../../hooks/useHandleChange";
import { FormGroup, FormLabel } from "../../layouts/customForm";
import { OK } from "../../services/constants/responseStatus";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { token } = useParams();

  const { formValue, handleFieldChange } = useHandleChange({
    password: "",
    c_password: "",
    token: encodeURIComponent(token),
  });
  const [load, setLoad] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(resetPw(formValue, setLoad)).then(({ status }) => {
      if (status === OK) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

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
