import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import CTAButton from "../../layouts/ctaButton";
import { resendOtp } from "../../services/actions/securityActions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { ResponseItem } from "../../layouts/responseItems";

function ResendOtp() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [load, setLoad] = useState(false);
  const isVerified = Cookies.get("isVerified");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resendOtp(setLoad));
  };

  useEffect(() => {
    if (isVerified === "true") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [isVerified]);

  return (
    <Alert show={show} variant="danger">
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
