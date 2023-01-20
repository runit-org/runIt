import React, { useState } from "react";
import { Card } from "react-bootstrap";
import UserProfile from "../Profile/user-profile";

function ProfileDash() {
  const [currUserData, setCurrUserData] = useState([]);

  const child_data = (data) => {
    if (data) {
      setCurrUserData(data);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content">{currUserData.username}</div>

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
