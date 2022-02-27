import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import img from "../logo192.png";

function PostItem(props) {
  return (
    <div>
      {/* <Row className="row justify-content-center">Event Data</Row> */}
      <Card>
        <Card.Body>
          <Card.Header>
            {" "}
            <Row xs="auto">
              <Col>
                <img src={img} className="userProf-img"></img>
              </Col>
              <Col>
                <h6 className="fw-bold">{props.eventTitle}</h6>

                <small
                  className="text-muted"
                  style={{ fontSize: "12px", display: "block" }}
                >
                  <a href="#" className="text-decoration-none">@{props.postedBy}</a> <strong> {props.createdTime} ago</strong>
                </small>
              </Col>
            </Row>
          </Card.Header>

          <Card.Text className="mt-4" dangerouslySetInnerHTML={{__html:props.eventDetails}}/>
        </Card.Body>
      </Card>
      <hr />
    </div>
  );
}

export default PostItem;
