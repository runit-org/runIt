import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { FormButton } from "../userAuth/utilities/auth-builder.js";
import { ResponseItem } from "../../layouts/responseItems.js";
import { useHandleChange } from "../../hooks/useHandleChange.js";

function Support() {
  //   const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({});

  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <SectionHeader size={"sm"}>Feedback & Support</SectionHeader>
          <hr />
          <fieldset>
            <Form
            /*   onSubmit={(e) => {
                handleSubmit(e);
              }} */
            >
              <Row className="col-md-6 m-2">
                <Form.Group controlId="formBasicEmail1">
                  <Form.Label className="text-muted small">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={handleFieldChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-2">
                  <Form.Label className="text-muted small">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleFieldChange}
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasic_CPassword" className="mb-3">
                  <Form.Label className="text-muted small">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="c_password"
                    onChange={handleFieldChange}
                    required
                  />
                </Form.Group>
                <ResponseItem />
                <FormButton load={load} name="Continue" />
              </Row>
            </Form>
          </fieldset>
        </Container>
      </div>
    </>
  );
}

export default Support;
