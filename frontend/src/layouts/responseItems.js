import React, { useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import { ResponseContext } from "../context/responseProvider";
import * as ResponseStatus from "../services/constants/responseStatus";
import { useSelector } from "react-redux";
import { REMOVE_EVENT, RESET_PW } from "../services/constants/apiTypes";

export const ResponseToast = () => {
  const [show, setShow] = useState(true);
  const successTypes = [REMOVE_EVENT, RESET_PW];
  const { type, response } = useSelector(
    (errorReducer) => errorReducer.errors.success
  );

  return (
    Object.keys(response).length > 0 &&
    successTypes.includes(type) && (
      <div className="mt-2">
        <Alert
          show={show}
          variant={"success"}
          onClose={() => setShow(false)}
          dismissible
        >
          <small>{response.message}</small>
        </Alert>
      </div>
    )
  );
};

export const ResponseItem = () => {
  const { response } = useContext(ResponseContext) || false;
  const { OK, BAD_REQUEST, UNAUTHORIZED, UNPROCESSABLE_ENTITY } =
    ResponseStatus;

  // Helper function to render password error items
  const renderErrorItems = (errors) => {
    return errors.map((item, index) => (
      <small className="text-danger d-block" key={index}>
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
