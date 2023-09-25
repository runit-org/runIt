import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPwEmail } from "../../services/actions/securityActions";
import { Link } from "react-router-dom";
import { ResponseItem } from "../../layouts/responseItems";
import { FormButton } from "./helper/auth-builder";
import { useHandleChange } from "../../hooks/useHandleChange";
import { FormLabel, FormGroup } from "../../layouts/customForm";

function ResetPasswordEmail() {
  const dispatch = useDispatch();
  const { formValue, handleFieldChange } = useHandleChange({
    email: "",
  });
  const [load, setLoad] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(resetPwEmail(formValue, setLoad));
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
            <h4 className="subTitle">Forgot your password?</h4>
            <ResponseItem />
          </div>

          <FormLabel>Email</FormLabel>
          <FormGroup formId="formBasicEmail">
            <Form.Control
              className="p-2"
              type="email"
              name="email"
              onChange={handleFieldChange}
              required
            />
          </FormGroup>
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
