import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { useSelector } from "react-redux";

function ErrorToast(props) {
  const [show, setShow] = useState(props.showToast);

  const reducer = useSelector((securityReducer) => securityReducer)

  useEffect(() => {
    setShow(props.showToast);
  }, [props.showToast,reducer ]);

  return (
    <div xs={6}>
      <Toast
        className="toasts position-absolute"
        style={props.variant}
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
