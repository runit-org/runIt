import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FormGroup, FormLabel } from "../../layouts/customForm.js";
import CTAButton from "../../layouts/ctaButton";
import { useDispatch } from "react-redux";
import { ResponseItem } from "../../layouts/responseItems";
import { useHandleChange } from "../../hooks/useHandleChange";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../services/actions/securityActions.js";
import * as ResponseStatus from "../../services/constants/responseStatus";
import Cookies from "js-cookie";

function VerifyEmail() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({
    token: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(verifyEmail(formValue, setLoad)).then((res) => {
      if (res.status === ResponseStatus.OK) {
        Cookies.set("isVerified", "true");
        setTimeout(() => {
          navigate("/posts");
        }, 2000);
      }
    });
  };

  return (
    <>
      <SectionHeader>Verify account</SectionHeader>
      <div className="otp-card p-2">
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <FormGroup formId="oldPassword">
            <FormLabel>Enter the 6 digit OTP sent to your email</FormLabel>
            <Form.Control
              type="number"
              name="token"
              onChange={handleFieldChange}
            />
            <ResponseItem />
          </FormGroup>

          <div className="d-flex align-items-center gap-3">
            <CTAButton
              type={"submit"}
              btnStyle={"formBtn cta_button d-inline"}
              variant={"primary"}
              isLoading={load}
              placeholder={
                <div className="d-flex align-items-center">Confirm</div>
              }
            />

            <Link
              to={{
                pathname: "/posts",
              }}
              className="text-muted"
            >
              return to dash
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default VerifyEmail;
