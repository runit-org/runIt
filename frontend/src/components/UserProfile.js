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
          <Offcanvas.Title className="text-center mx-auto">
            <Row>
              <Col>
                <h6 className="fw-bold">User Profile</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="text-muted titleInfo"> some info, info</h6>
              </Col>
            </Row>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <p>User details, images and etc</p>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default UserProfile;
