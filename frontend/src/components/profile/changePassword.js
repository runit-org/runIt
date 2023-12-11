import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { ResponseItem } from "../../layouts/responseItems.js";
import { useHandleChange } from "../../hooks/useHandleChange.js";
import CTAButton from "../../layouts/ctaButton.js";
import { FormGroup, FormLabel } from "../../layouts/customForm.js";
import { useDispatch } from "react-redux";
import { changePassword } from "../../services/actions/userActions.js";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { useHandleLogout } from "../../hooks/useHandleLogout.js";
import { Button, InputGroup } from "react-bootstrap";
import { useInputType } from "../../hooks/useInputType.js";
import { Eye, EyeSlash } from "../../layouts/icons.js";

function ChangePassword() {
  const dispatch = useDispatch();
  const logout = useHandleLogout();
  const [load, setLoad] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({
    current_password: "",
    password: "",
    c_password: "",
  });
  const { inputType, handleInputType } = useInputType();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changePassword(formValue, setLoad)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        logout(e);
      }
    });
  };

  return (
    <>
      <SectionHeader>Change password</SectionHeader>
      <small className="text-muted d-block ms-1">
        You will be logged out upon successful password update.
      </small>
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
                type={inputType}
                name="current_password"
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <FormGroup formId="newPassword" customStyle="col-md-6">
              <FormLabel>New password</FormLabel>

              <Form.Control
                type={inputType}
                name="password"
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <FormGroup formId="c_newPassword" customStyle="col-md-6">
              <FormLabel>Confirm new password</FormLabel>

              <InputGroup>
                <Form.Control
                  type={inputType}
                  name="c_password"
                  onChange={handleFieldChange}
                  required
                />
                <Button
                  className="fst-italic show_hide-pw"
                  name="login"
                  onClick={() => {
                    handleInputType();
                  }}
                >
                  {inputType === "password" ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </FormGroup>

            <Form.Text className="text-muted d-block">
              Make sure it's at least 8 characters including a number, at least
              1 alphabetical and letter a special character.
            </Form.Text>

            <CTAButton
              type={"submit"}
              btnStyle={"formBtn cta_button mt-3 d-block"}
              variant={"primary"}
              isLoading={load}
              placeholder={
                <div className="d-flex align-items-center">Update password</div>
              }
            />
            <ResponseItem />
          </Form>
        </fieldset>
      </div>
    </>
  );
}

export default ChangePassword;
