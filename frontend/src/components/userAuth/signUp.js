import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../services/actions/securityActions";
import { useNavigate } from "react-router-dom";
import { FormButton } from "./helper/auth-builder";
import { ResponseItem } from "../../layouts/responseItems";
import { useHandleChange } from "../../hooks/useHandleChange";
import { FormGroup, FormLabel } from "../../layouts/customForm";
import { useInputType } from "../../hooks/useInputType";
import { Eye, EyeSlash } from "../../layouts/icons";

function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState("");
  const [formSwitch, setFormSwitch] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({
    username: "",
    email: "",
    password: "",
    c_password: "",
  });
  const { inputType, handleInputType } = useInputType();

  var apiStatus = useSelector((securityReducer) => securityReducer.security);

  useEffect(() => {
    if (apiStatus.userData) {
      setSignUpStatus(apiStatus.userData.success);
    }
  }, [apiStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSwitch(true);
    dispatch(createNewUser(formValue, setLoad, navigate));
  };

  useEffect(() => {
    if (signUpStatus !== "true" && signUpStatus === undefined) {
      setFormSwitch(false);
    }
  }, [signUpStatus, navigate, apiStatus]);

  return (
    <>
      <fieldset disabled={formSwitch}>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <h4 className="subTitle">Create your account</h4>
          </div>
          <Row>
            <FormGroup formId="formBasicUsername" customStyle="col-md-6">
              <FormLabel>Username</FormLabel>
              <Form.Control
                type="text"
                name="username"
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <FormGroup formId="formBasicEmail" customStyle="col-md-6">
              <FormLabel>Email</FormLabel>
              <Form.Control
                type="email"
                name="email"
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <FormGroup formId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <Form.Control
                type={inputType}
                name="password"
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <FormGroup formId="formBasicCPassword">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Form.Control
                  type={inputType}
                  name="c_password"
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
                  {inputType === "password" ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </FormGroup>

            <Form.Text>
              Minimum 8 characters At least 1 number At least 1 alphabetical
              letter At least 1 special character (e.g., @$!%*#?&)
            </Form.Text>
            <ResponseItem />
            <FormButton load={load} name="Continue" />
          </Row>
        </Form>
      </fieldset>
    </>
  );
}

export default SignUp;
