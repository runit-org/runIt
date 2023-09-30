import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import CTAButton from "../../layouts/ctaButton";
import { resendOtp } from "../../services/actions/securityActions";
import { useDispatch } from "react-redux";
import { ResponseItem } from "../../layouts/responseItems";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { useNavigate } from "react-router-dom";
import { useVerifyAuthUser } from "../../hooks/useCheckCurrUser";

function ResendOtp() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { currentUser } = useVerifyAuthUser();
  const [load, setLoad] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resendOtp(setLoad)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        navigate("/verify");
      }
    });
  };

  if (!currentUser || Object.keys(currentUser).length === 0) {
    return null;
  }

  return (
    <Alert show={!currentUser.is_email_verified} variant="danger">
      <h6 className="d-flex justify-content-between">
        Verify your account <ResponseItem />
      </h6>
      <small>Verify your account to gain uninterrupted access.</small>

      <CTAButton
        type={"submit"}
        btnStyle={"formBtn cta_button mt-3 d-block"}
        variant={"danger"}
        isLoading={load}
        onClick={handleSubmit}
        placeholder={
          <div className="d-flex align-items-center fw-bold">Verify</div>
        }
      />
    </Alert>
  );
}

export default ResendOtp;
