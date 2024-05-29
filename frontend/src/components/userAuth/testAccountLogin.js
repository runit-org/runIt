import React, { useState } from "react";
import { login } from "../../services/actions/securityActions";
import { useDispatch } from "react-redux";
import { ResponseItem } from "../../layouts/responseItems";
import { Link, useNavigate } from "react-router-dom";
import { FormButton } from "./helper/auth-builder";
import { Col, Form, Row } from "react-bootstrap";

function TestAccountLogin() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [load, setLoad] = useState(false);

  // dummy account login handler
  const handleTestAccLogin = async (e) => {
    e.preventDefault();
    dispatch(
      login(
        {
          username: "felixgoodman",
          password: "password",
        },
        navigate,
        setLoad
      )
    );
  };

  return (
    <Form
      onSubmit={(e) => {
        handleTestAccLogin(e);
      }}
    >
      <div className="mb-4">
        <h4 className="subTitle">Test Account Login</h4>
      </div>

      <div>
        <div className="message-block mb-3">
          Explore our platform's features risk-free with our test account login.
          No need to create a personal account—simply dive in and experience
          everything our platform has to offer.
        </div>
        <Form.Text>
          Test account comes with prepopulated events, comments, and data to
          simulate user interaction.
        </Form.Text>
      </div>
      <ResponseItem />
      <FormButton load={load} name="Continue" />
      <hr className="divider" />
      <Row className="mt-3">
        <Col className="text-center">
          <Link to="/">Return to log in</Link>
        </Col>
      </Row>
    </Form>
  );
}

export default TestAccountLogin;
