import React, { useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import img from "../logo192.png";

function Posts() {
  return (
    <div className="content">
      {/* <Row className="row justify-content-center">Event Data</Row> */}
      <Row>
        <Col className="post-cards">
          <Card>
            <Card.Body>
              <Card.Header>
                {" "}
                <Row xs="auto">
                  <Col>
                    <img src={img} className="jobCard-Logo"></img>
                  </Col>
                  <Col>
                    <h6 className="fw-bold">User One</h6>

                    <small
                      className="text-muted"
                      style={{ fontSize: "12px", display: "block" }}
                    >
                      @userOne . 5 days ago
                    </small>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Text className="mt-4">
                With supporting text below as a natural lead-in to additional
                content. With supporting text below as a natural lead-in to
                additional content. With supporting text below as a natural
                lead-in to additional content. With supporting text below as a
                natural lead-in to additional content. With supporting text
                below as a natural lead-in to additional content. With
                supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
            </Card.Body>
          </Card>
          <hr />
        </Col>

        <Col sm={3} className="sidebar post-cards">
          <Card>
            <Card.Body>
              <Card.Title className="text-muted mb-4">Recent Posts</Card.Title>
              <Card.Text className="fw-bold">
                {" "}
                <img src={img} className="recents-Logo"></img> Post one
              </Card.Text>
              <Card.Text className="fw-bold">
                {" "}
                <img src={img} className="recents-Logo"></img> Post one
              </Card.Text>
              <Card.Text className="fw-bold">
                {" "}
                <img src={img} className="recents-Logo"></img> Post one
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Posts;
