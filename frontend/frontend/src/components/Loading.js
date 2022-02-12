import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      variant="light"
    />
  );
}

export default Loading;
