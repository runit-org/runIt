import React, {useEffect} from "react";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import Footer from "./Footer"
import {useDispatch, useSelector} from "react-redux"
import {getUsers} from "../actions/securityActions"

function Login() {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(getUsers())
  }, [])
  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <h1 className="title">Event Matcher</h1>
      </div>
      <div className="d-flex justify-content-center p-3">
        <Card>
          <h3 className="d-flex justify-content-center mt-3">Login</h3>
          <Form className="p-4">
              <Form.Label className="text-muted">Email</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-muted">Password</Form.Label>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </Form.Group>
            <Row>
              <Col xs="auto">
                <Form.Check
                  type="checkbox"
                  id="autoSizingCheck"
                  className="mb-2 text-muted"
                  label="Remember me"
                />
              </Col>
              <Col xs="auto">
                <a href="#" className="mb-2">
                  Forgot Password
                </a>
              </Col>
            </Row>
            <div className="d-flex justify-content-center align-items-center">
              <Button type="submit" className="mb-2 mt-3 w-100">
                Login
              </Button>
            </div>
          </Form>
          <Card.Footer>
            <small className="d-flex justify-content-center align-items-center">
              New to the platform?&nbsp;<a href="#">Sign Up</a>
            </small>
          </Card.Footer>
        </Card>
      </div>
     <Footer/>
    </div>
  );
}

export default Login;
