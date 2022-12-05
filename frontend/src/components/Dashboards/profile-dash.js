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
            <Card style={{ maxWidth: "20rem" }}>
              <Card.Body>
                <UserProfile
                  userData={child_data}
                  username={localStorage.getItem("username")}
                />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Latest Activity</h6>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDash;
