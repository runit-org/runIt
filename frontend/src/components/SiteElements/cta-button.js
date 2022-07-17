import React from "react";
import { Button } from "react-bootstrap";
import Loading from "./loading";

function CTAButton(props) {
  return (
    <React.Fragment>
      <Button
        onClick={props.onClick}
        type={props.type}
        className={props.btnStyle}
        disabled={props.formValidation != null ? props.formValidation : false}
        variant={props.variant}
        size="lg"
      >
        {(() => {
          if (props.load) {
            return <Loading />;
          } else {
            return props.placeholder;
          }
        })()}
      </Button>
    </React.Fragment>
  );
}

export default CTAButton;
