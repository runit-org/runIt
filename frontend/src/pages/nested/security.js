import React from "react";
import { Container } from "react-bootstrap";
import ChangePassword from "../../components/profile/changePassword";
import Otp from "../../components/profile/otp";

function Security() {
  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <div className="mx-4 col-md-8">
            <Otp />
            <ChangePassword />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Security;
