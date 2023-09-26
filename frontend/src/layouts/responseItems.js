import React, { useState, useEffect, useContext } from "react";
import { Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ResponseContext } from "../context/responseProvider";
import * as ResponseStatus from "../services/constants/responseStatus";

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
  const { OK, BAD_REQUEST, UNAUTHORIZED, UNPROCESSABLE_ENTITY } =
    ResponseStatus;

  // Helper function to render password error items
  const renderErrorItems = (errors) => {
    return errors.map((item, index) => (
      <small className="text-danger" key={index}>
        {item}
      </small>
    ));
  };

  // Render component based on response status
  const renderResponse = () => {
    if (!response) return null;

    switch (response.status) {
      case OK:
        return <small className="text-success">{response.message}</small>;
      case BAD_REQUEST:
      case UNAUTHORIZED:
      case UNPROCESSABLE_ENTITY:
        return (
          <>
            <small className="text-danger fw-bold">{response.message}</small>
            {Object.keys(response.info).length !== 0
              ? renderErrorItems(response.info[0].password)
              : null}
          </>
        );
      default:
        return (
          <small className="text-danger fw-bold">{response.message}</small>
        );
    }
  };
  return <>{renderResponse()}</>;
};
