import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <>
      <Container>
        <div>
          <hr className="divider" />
          <p>
            <small>
              <span>
                <strong style={{ color: "#5865f2" }}>eventmatcher</strong>{" "}
                {/* by Julian &#38; Manan  projek*/}
              </span>
            </small>
          </p>
        </div>

        <Row xs="auto" className=" footer-links">
          <Col>
            <small>
              <a href="#">Terms of Service</a>
            </small>
          </Col>
          <Col>
            <small>
              <a href="#">Privacy</a>
            </small>
          </Col>
          <Col>
            <small>
              <a href="#">Cookies</a>
            </small>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
