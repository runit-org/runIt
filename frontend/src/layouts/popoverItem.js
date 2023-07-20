import React, { useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import UserPopoverContent from "./popverContent";

const PopoverItem = (props) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const handleOnMouseEnter = () => {
    setShow(true);
  };
  const handleOnMouseLeave = () => {
    setShow(false);
  };

  return (
    <OverlayTrigger
      show={show}
      placement="auto"
      container={ref}
      overlay={
        <Popover
          id="popover-basic"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <Popover.Body>
            <UserPopoverContent data={props.data} />
          </Popover.Body>
        </Popover>
      }
    >
      <span
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        ref={ref}
        className="username_tags align-self-center"
      >
        @{props.data}
      </span>
    </OverlayTrigger>
  );
};

export default PopoverItem;
