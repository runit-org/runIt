import React, { useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import UserPopoverContent from "./user/popverContent";

const PopoverItem = ({ children, data, id, popoverBody, childrenClass }) => {
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
          id={id}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <Popover.Body>
            {id === "profile-popover" ? (
              <UserPopoverContent data={data} />
            ) : (
              popoverBody
            )}
          </Popover.Body>
        </Popover>
      }
    >
      <span
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        ref={ref}
        className={childrenClass}
      >
        {children}
      </span>
    </OverlayTrigger>
  );
};

export default PopoverItem;
