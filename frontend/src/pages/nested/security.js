import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { ResponseItem } from "../../layouts/responseItems.js";
import { useHandleChange } from "../../hooks/useHandleChange.js";
import CTAButton from "../../layouts/ctaButton.js";
import { FormGroup, FormLabel } from "../../layouts/customForm.js";
import { useDispatch } from "react-redux";
import { changePassword } from "../../services/actions/userActions.js";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { useHandleLogout } from "../../hooks/useHandleLogout.js";

function Security() {
  const dispatch = useDispatch();
  const logout = useHandleLogout();
  const [load, setLoad] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({
    current_password: "",
    password: "",
    c_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changePassword(formValue, setLoad)).then((res) => {
      if (res.status === ResponseStatus.OK) {
        logout(e);
      }
    });
  };

  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <div className="mx-4 col-md-8">
            <SectionHeader>Change password</SectionHeader>
            <Form.Text className="text-muted d-block ms-1">
              You will be logged out upon successful password update.
            </Form.Text>
            <hr />

            <div className="p-2">
              <fieldset>
                <Form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <FormGroup formId="oldPassword" customStyle="col-md-6">
                    <FormLabel>Old password</FormLabel>
                    <Form.Control
                      type="password"
                      name="current_password"
                      onChange={handleFieldChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup formId="newPassword" customStyle="col-md-6">
                    <FormLabel>New password</FormLabel>

                    <Form.Control
                      type="password"
                      name="password"
                      onChange={handleFieldChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup formId="c_newPassword" customStyle="col-md-6">
                    <FormLabel>Confirm new password</FormLabel>

                    <Form.Control
                      type="password"
                      name="c_password"
                      onChange={handleFieldChange}
                      required
                    />
                  </FormGroup>

                  <Form.Text className="text-muted d-block">
                    Make sure it's at least 8 characters including a number, at
                    least 1 alphabetical and letter a special character.
                  </Form.Text>

                  <CTAButton
                    type={"submit"}
                    btnStyle={"formBtn cta_button mt-3 d-block"}
                    variant={"primary"}
                    isLoading={load}
                    placeholder={
                      <div className="d-flex align-items-center">
                        Update password
                      </div>
                    }
                  />
                  <ResponseItem />
                </Form>
              </fieldset>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Security;
