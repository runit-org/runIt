import React from "react";
import { Row, Col } from "react-bootstrap";
import { AppLogo } from "./icons";
import packageJson from "../../package.json";
import { NavigationObj } from "../utilities/navigationObj";

function Footer() {
  return (
    <div className="footer-container">
      <Row>
        <Col sm={6} className="footer-logo mt-auto">
          <AppLogo w={"40px"} />
          <small className="text-muted align-bottom ms-1">
            {packageJson.version}
          </small>
        </Col>

        <Col sm={6} className="footer-links">
          {NavigationObj().footerLinks.map((item, index) => {
            return (
              <span key={index}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </span>
            );
          })}
          <small className="text-muted d-block">
            All contents @ {new Date().getFullYear()}{" "}
            <span style={{ color: "#5865f2", fontWeight: "600" }}>runit</span>{" "}
            All rights reserved.
          </small>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
