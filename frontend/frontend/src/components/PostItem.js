import React, { useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import img from "../logo192.png";

function PostItem(props) {
  return (
    <div >
      {/* <Row className="row justify-content-center">Event Data</Row> */}
          <Card>
            <Card.Body>
              <Card.Header>
                {" "}
                <Row xs="auto">
                  <Col>
                    <img src={img} className="jobCard-Logo"></img>
                  </Col>
                  <Col>
                    <h6 className="fw-bold">{props.eventTitle}</h6>

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
    </div>
  );
}

export default PostItem;
