import React from "react";
import { Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <>
      <div className="footer-container d-flex justify-content-between">
        <div>
          <small>
            <span>
              <strong style={{ color: "#5865f2" }}>eventmatcher</strong>{" "}
              <small className="text-muter">- v1.0.0</small>
            </span>
          </small>
        </div>

        <Row xs="auto" className="footer-links">
          <Col>
            <a href="#">Support</a>
          </Col>
          <Col>
            <a href="#">About</a>
          </Col>
          <Col>
            <a href="#">Changelog</a>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Footer;
