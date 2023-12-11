import React from "react";
import { Row, Col } from "react-bootstrap";
import { AppLogo } from "./icons";
import { RUNIT_ABOUT, RUNIT_CHANGELOG, RUNIT_SUPPORT } from "../routes/routes";

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
            <a href={RUNIT_SUPPORT} target="_blank" rel="noreferrer">
              Support
            </a>
          </span>
          <span>
            <a href={RUNIT_ABOUT} target="_blank" rel="noreferrer">
              About
            </a>
          </span>
          <span>
            <a href={RUNIT_CHANGELOG} target="_blank" rel="noreferrer">
              Changelog
            </a>
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
