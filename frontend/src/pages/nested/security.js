import React from "react";
import { Container } from "react-bootstrap";
import ChangePassword from "../../components/profile/changePassword";
import ResendOtp from "../../components/userAuth/resendOtp";
import VerifyEmail from "../../components/userAuth/verifyEmail";

function Security() {
  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <div className="mx-4 col-md-8">
            <ResendOtp />
            <VerifyEmail />
            <ChangePassword />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Security;
