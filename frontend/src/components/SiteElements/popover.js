import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import img from "../../logo192.png";

function popoverContent(data) {
  return (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="d-flex align-items-center userInfo-div">
          <img src={img} className="userProf-img" alt="use profile" />
          <div className="ms-4">
            <h6 className="m-0">{data.username}</h6>
            <small>{data.email} </small>
          </div>
        </div>
        <div className="mt-4">
          <strong>Votes:</strong> {data.totalVote}
        </div>
      </Popover.Body>
    </Popover>
  );
}
function PopoverProf({ children, data }) {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      overlay={popoverContent(data)}
    >
      {children}
    </OverlayTrigger>
  );
}

export default PopoverProf;
