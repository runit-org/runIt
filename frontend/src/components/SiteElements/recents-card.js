import React from "react";

function RecentsCard(props) {
  return (
    <div className="recents-div">
      <strong className="me-auto">{props.eventTitle}</strong>
      <small className="float-end text-muted">{props.time} ago</small>
    </div>
  );
}

export default RecentsCard;
