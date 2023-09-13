import React from "react";
import { Container } from "react-bootstrap";
import ChangePassword from "../../components/profile/changePassword";

function Security() {
  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <div className="mx-4 col-md-8">
            <ChangePassword />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Security;
