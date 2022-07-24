import React, { useState } from "react";
import { Row, Col, Offcanvas } from "react-bootstrap";

function UserProfile(props) {
  return (
    <div>
      <Offcanvas
        show={props.accountShow}
        placement={"end"}
        onHide={props.close}
      >
       <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Your profile</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <p>User details, images and etc</p>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default UserProfile;
