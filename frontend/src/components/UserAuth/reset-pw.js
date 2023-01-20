import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetPw } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import ErrorToast from "../SiteElements/error-toast";
import { useNavigate } from "react-router-dom";
import { MsgToast } from "../SiteElements/msg-toast";
import { FormButton } from "./utilities/auth-builder";

function ResetPassword(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [c_password, set_c_Password] = useState({});
  const [password, setPassword] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [formSwitch, setFormSwitch] = useState(false);

  var errorStatus = useSelector((errorReducer) => errorReducer.errors.errors);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      password: password,
      c_password: c_password,
      token: props.token,
    };

    dispatch(resetPw(userData, setLoad, setShow));
  };

  useEffect(() => {
    if (errorStatus && errorStatus.status === 200) {
      setTimeout(() => {
        navigate("/", {
          replace: true,
        });
      }, 1000);
    }
  }, [navigate, errorStatus]);

  useEffect(() => {
    setFormSwitch(load);
  }, [load]);

  return (
    <>
      <ErrorToast
        showToast={show}
        variant={
          errorStatus.status === 200
            ? MsgToast().successVariant
            : MsgToast().errorVariant
        }
      />

      <fieldset disabled={formSwitch}>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <h4 className="subTitle">Reset Password</h4>
          </div>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="text-muted visually-hidden">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-muted visually-hidden">
              Confirm Password
            </Form.Label>

            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => set_c_Password(e.target.value)}
              required
            />
          </Form.Group>
          <FormButton load={load} name="Confirm" />
          <hr className="divider" />
          <Row className="mt-3">
            <Col className="text-center">
              <Link to="/">Return to log in</Link>
            </Col>
          </Row>
        </Form>
      </fieldset>
    </>
  );
}

export default ResetPassword;
