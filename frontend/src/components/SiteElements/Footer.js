import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <div>
      <footer
        className="align-items-center mt-5 w-100 p-4 fixed-bottom"
        style={{ color: "white", background: "#282c34" }}
      >
        <Container>
          <Row>
            <div>
              {/* <hr className="footer-hr" /> */}

              <p>
                <small className="centerContent">
                 <span><strong style={{color:"#5865f2"}}>Event Matcher</strong> by Julian &#38; Manan</span>
                </small>
              </p>
            </div>
          </Row>
          <Row xs="auto" className="centerContent footer-links">
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
      </footer>
    </div>
  );
}

export default Footer;
