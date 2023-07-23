import React, { useEffect, useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/securityActions";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FormButton } from "./utilities/auth-builder";
import { Eye, EyeSlash } from "../../layouts/icons";
import { ResponseItem } from "../../layouts/responseItems";
import { useHandleChange } from "../../hooks/useHandleChange";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [signupData, setSignupData] = useState("");
  const [formSwitch, setFormSwitch] = useState(false);
  const [inputType, setInputType] = useState("password");

  const { formValue, setFormValue, handleFieldChange } = useHandleChange({
    username: "",
    password: "",
  });

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { id } = state;
      setSignupData(id.data.username);
      setFormValue({ username: id.data.username });
    }
  }, [state, setFormValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formValue, navigate, setLoad));
  };

  const handleInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

  return (
    <>
      <fieldset disabled={formSwitch}>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <h4 className="subTitle">
              {signupData !== "" ? (
                <span>
                  welcome{" "}
                  <span style={{ color: "#5865f2" }}>{signupData}!</span>
                </span>
              ) : (
                <span>Sign in to your account</span>
              )}
            </h4>
          </div>

          <Form.Label className="text-muted small">Username</Form.Label>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Control
              type="username"
              name="username"
              value={
                Object.keys(formValue.username).length !== 0
                  ? formValue.username
                  : ""
              }
              onChange={handleFieldChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-muted small">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={inputType}
                name="password"
                onChange={handleFieldChange}
                required
              />
              <Button
                className="fst-italic show_hide-pw"
                name="login"
                onClick={() => {
                  handleInputType();
                }}
              >
                {inputType === "password" ? <Eye /> : <EyeSlash />}
              </Button>
            </InputGroup>
          </Form.Group>
          <ResponseItem />
          <FormButton load={load} name="Login" />
          <hr className="divider" />
          <Row className="mt-3">
            <Col className="text-center">
              <Link to="/reset-password-auth">Forgot Password?</Link>
            </Col>
          </Row>
        </Form>
      </fieldset>
    </>
  );
}

export default Login;