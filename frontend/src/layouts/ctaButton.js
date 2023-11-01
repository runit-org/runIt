import React from "react";
import Button from "react-bootstrap/Button";
import { Loading } from "./loader";

function CTAButton(props) {
  return (
    <React.Fragment>
      {props.btnStyleFull ? (
        <Button variant="primary" className="w-max" onClick={props.onClick}>
          {props.title}
        </Button>
      ) : (
        <Button
          onClick={props.onClick}
          type={props.type}
          className={props.btnStyle}
          disabled={props.formValidation != null ? props.formValidation : false}
          variant={props.variant}
          size="sm"
        >
          {(() => {
            if (props.isLoading) {
              return <Loading />;
            } else {
              return props.placeholder;
            }
          })()}
        </Button>
      )}
    </React.Fragment>
  );
}

export default CTAButton;
