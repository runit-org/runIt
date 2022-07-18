import React from "react";
import { Toast } from "react-bootstrap";
import img from "../../logo192.png";

function SideNav(props) {
  return (
    <div className="recents-div">
      {/* <Card.Text className="fw-bold">
        <img src={img} className="recents-Logo"></img> {props.eventTitle}
      </Card.Text> */}
      <Toast className="notif-Toasts">
        <Toast.Header closeButton={false}>
          {/* <img src={img} className="rounded me-2" width={30} alt="Img"></img> */}
          <strong className="me-auto">{props.eventTitle}</strong>
          <small>{props.time}</small>
        </Toast.Header>
        <Toast.Body dangerouslySetInnerHTML={{ __html: props.detail }} />
      </Toast>
    </div>
  );
}

export default SideNav;
