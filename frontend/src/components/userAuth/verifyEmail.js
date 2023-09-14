import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { FormGroup, FormLabel } from "../../layouts/customForm.js";
import CTAButton from "../../layouts/ctaButton";
import { useDispatch } from "react-redux";
import { ResponseItem } from "../../layouts/responseItems";
import { useHandleChange } from "../../hooks/useHandleChange";
import { SectionHeader } from "../../layouts/sectionHeader.js";

function VerifyEmail() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({
    current_password: "",
    password: "",
    c_password: "",
  });

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changePassword(formValue, setLoad)).then((res) => {
      if (res.status === ResponseStatus.OK) {
        logout(e);
      }
    });
  }; */

  return (
    <div className="mb-3">
      <SectionHeader>Verify account</SectionHeader>
      <Form.Text className="text-muted d-block ms-1">
        Enter the OTP sent to your email.
      </Form.Text>
      <hr />
      <div className="p-2">
        <fieldset>
          <Form
          /* onSubmit={(e) => {
              handleSubmit(e);
            }} */
          >
            <FormGroup formId="oldPassword" customStyle="col-md-6">
              <FormLabel>6 digit OTP</FormLabel>
              <Form.Control
                type="password"
                name="current_password"
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <Form.Text className="text-muted d-block">
              You will reqiuire to login again after being verified
            </Form.Text>

            <CTAButton
              type={"submit"}
              btnStyle={"formBtn cta_button mt-3 d-block"}
              variant={"primary"}
              isLoading={load}
              placeholder={
                <div className="d-flex align-items-center">Submit</div>
              }
            />
            <ResponseItem />
          </Form>
        </fieldset>
      </div>
    </div>
  );
}

export default VerifyEmail;
