import React, { useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import UserPopoverContent from "./popverContent";

const PopoverItem = ({ children, data }) => {
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
          id="profile-popover"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <Popover.Body>
            <UserPopoverContent data={data} />
          </Popover.Body>
        </Popover>
      }
    >
      <span
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        ref={ref}
      >
        {children}
      </span>
    </OverlayTrigger>
  );
};

export default PopoverItem;
