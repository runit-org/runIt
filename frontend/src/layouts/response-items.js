import React, { useState, useEffect, useContext } from "react";
import { Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ResponseContext } from "../Context/response-context";
import * as ResponseStatus from "../services/constants/response-status";

export const ResponseToast = (props) => {
  const [show, setShow] = useState(props.showToast);
  const [msg, setMsg] = useState("");

  const reducer = useSelector((errorReducer) => errorReducer.errors.errors);

  useEffect(() => {
    setShow(props.showToast);
    if (reducer.data) {
      if (reducer.data.detail) {
        setMsg(reducer.data.detail);
      } else if (reducer.data.message) {
        setMsg(reducer.data.message);
      }
    } else {
      setMsg("Fe: Err report");
    }
  }, [props.showToast, reducer]);

  return (
    <div className="d-flex justify-content-center">
      <Toast
        className="toasts position-absolute"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <div className="d-flex align-items-center">
            <div
              style={props.variant}
              className="d-inline-flex align-items-center justify-content-center toasts-icon"
            >
              {props.variant.icon}
            </div>
            <div className="ms-2">{msg}</div>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export const ResponseItem = () => {
  const { response } = useContext(ResponseContext) || false;

  return (
    <>
      {response ? (
        response.status === ResponseStatus.OK ? (
          <small className="text-success">{response.message}</small>
        ) : response.status === ResponseStatus.BAD_REQUEST ||
          response.status === ResponseStatus.UNAUTHORIZED ||
          response.status === ResponseStatus.UNPROCESSABLE_ENTITY ? (
          <small className="text-danger">{response.message}</small>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};
