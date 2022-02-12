import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function ErrorToast(props) {
  const [show, setShow] = useState(props.showToast);

  useEffect(() => {
    setShow(props.showToast);
  }, [useSelector((securityReducer) => securityReducer)]);

  return (
    <div xs={6}>
      <Toast
         className="toasts position-absolute"
        style={{ background: "#FFD2D2", color: "#D8000C", fontSize: "14px" }}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body>{props.errors}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ErrorToast;
