import React, { useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

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
            <div className="p-2">
              <span className="fw-bold">Location: </span>
              <span>{props.content.location}</span>
            </div>
            <div className="p-2">
              <span className="fw-bold">Date: </span>
              <span>
                {new Date(props.content.timeStamp).toLocaleDateString()}
              </span>
            </div>
            <div className="p-2">
              <span className="fw-bold">Time: </span>
              <span>
                {new Date(props.content.timeStamp).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="p-2">
              <a href={props.content.link} rel="noreferrer" target="_blank">
                More Information
              </a>
            </div>
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
        {props.icon}
      </span>
    </OverlayTrigger>
  );
};

export default PopoverItem;
