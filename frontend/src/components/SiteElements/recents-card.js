import React from "react";

function RecentsCard(props) {
  return (
    <div className="recents-div">
      <div>
        <strong className="me-auto">{props.eventTitle}</strong>
        <small className="float-end text-muted">{props.time} ago</small>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: props.detail,
        }}
      />
    </div>
  );
}

export default RecentsCard;
