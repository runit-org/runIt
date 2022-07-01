import React from "react";
import { Card } from "react-bootstrap";
import img from "../../logo192.png";

function SideNav(props) {
  return (
    <div>
      <Card.Text className="fw-bold">
        <img src={img} className="recents-Logo"></img> {props.eventTitle}
      </Card.Text>
    </div>
  );
}

export default SideNav;
