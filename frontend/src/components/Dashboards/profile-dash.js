import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import Calendar from "../Calendar/calendar";
import UserProfile from "../Profile/user-profile";

function ProfileDash() {
  // eslint-disable-next-line no-unused-vars
  const [currUserData, setCurrUserData] = useState([]);

  const child_data = (data) => {
    if (data) {
      setCurrUserData(data);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content">
          <Container>
            {/* {currUserData.username} */}
            <Calendar />
          </Container>
        </div>

        <div className="sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar_right">
              <Card>
                <Card.Body>
                  <UserProfile userData={child_data} />
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDash;
