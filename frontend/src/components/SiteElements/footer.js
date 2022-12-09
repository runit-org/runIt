import React from "react";
import { Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer-container">
      <Row>
        <Col sm={6} className="footer-logo">
          <small>
            <strong style={{ color: "#5865f2" }}>runIt</strong>{" "}
            <small className="text-muter">- v1.0.0</small>
          </small>
        </Col>

        <Col sm={6} className="footer-links">
          <span>
            <a href="#">Support</a>
          </span>
          <span>
            <a href="#">About</a>
          </span>
          <span>
            <a href="#">Changelog</a>
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
