import React from "react";
import { Row, Col } from "react-bootstrap";
import { AppLogo } from "./icons";

function Footer() {
  return (
    <div className="footer-container">
      <Row>
        <Col sm={6} className="footer-logo">
          <small>
            <AppLogo w={"40px"} />{" "}
            <small className="text-muter">- v1.0.0</small>
          </small>
        </Col>

        <Col sm={6} className="footer-links">
          <span>
            <a href="/">Support</a>
          </span>
          <span>
            <a href="/">About</a>
          </span>
          <span>
            <a href="/">Changelog</a>
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
