import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../actions/securityActions";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FormButton } from "./utilities/auth-builder";
import { Eye, EyeSlash } from "../SiteElements/icons";
import { ResponseContext } from "../Context/response-context";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [signupData, setSignupData] = useState("");
  const [formSwitch, setFormSwitch] = useState(false);
  const [inputType, setInputType] = useState("password");

  const { state } = useLocation();

  const { response, status } = useContext(ResponseContext);

  useEffect(() => {
    if (state) {
      const { id } = state;
      setSignupData(id.data.username);
      setUsername(id.data.username);
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginRequest = {
      username: username,
      password: password,
    };
    dispatch(login(LoginRequest, navigate, setLoad));
  };

  const handleInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

  return (
    <>
      {/* <ErrorToast showToast={show} variant={MsgToast().errorVariant} /> */}
      <fieldset disabled={formSwitch}>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <span className="mb-4">
            <h4 className="subTitle">
              {signupData !== "" ? (
                <span>
                  welcome{" "}
                  <span style={{ color: "#5865f2" }}>{signupData}!</span>
                </span>
              ) : (
                <span>Sign in</span>
              )}
            </h4>
          </span>

          <Form.Label className="text-muted visually-hidden">
            Username
          </Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="username"
              placeholder="Username"
              value={Object.keys(username).length !== 0 ? username : ""}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-muted visually-hidden">
              Password
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={inputType}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
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
          {status !== 200 ? (
            <small className="text-danger">{response}</small>
          ) : (
            ""
          )}
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
