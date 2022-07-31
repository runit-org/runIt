import React from "react";

function SideNav(props) {
  return (
    <div className="recents-div">
      <div>
        <strong className="me-auto">{props.eventTitle}</strong>
        <small className="float-end">{props.time}</small>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: props.detail,
        }}
      />
      <hr />
    </div>
  );
}

export default SideNav;
