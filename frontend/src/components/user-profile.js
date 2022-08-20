import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import img from "../logo192.png";

function UserProfile(props) {
  return (
    <div>
      <Row>
        <Col sm={3} md={4}>
          <Card.Img src={img} className="userProf-img" alt="Img" />
        </Col>
        <Col sm={5} md={5}>
          <strong>UserName</strong>
          <small className="d-block text-muted">User status</small>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <strong>11k</strong>
          <small className="d-block">Followers</small>
        </Col>
        <Col className="text-center">
          <strong>11k</strong>
          <small className="d-block">Following</small>
        </Col>
      </Row>
      {/*  <Row className="mt-4">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              style={{ borderRadius: "15px" }}
              as="textarea"
              rows={3}
              placeholder="Share your thoughts..."
            />
          </Form.Group>
        </Form>
      </Row> */}
    </div>
  );
}

export default UserProfile;
