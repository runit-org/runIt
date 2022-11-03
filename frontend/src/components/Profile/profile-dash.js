import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import UserProfile from "./user-profile";
import Vote from "./vote";

function ProfileDash() {
  const [owner, setOwner] = useState(false);
  const [currUserData, setCurrUserData] = useState("");

  const child_data = (data) => {
    if (data) {
      setCurrUserData(data);
    }
  };

  useEffect(() => {
    if (currUserData.username === localStorage.getItem("username")) {
      setOwner(true);
    }
  }, [currUserData]);

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content"></div>

        <div className="sidebar">
          <div className="sidebar-wrapper">
            <Card style={{ maxWidth: "20rem" }}>
              <Card.Body>
                <UserProfile userData={child_data} />
              </Card.Body>
              {!owner ? (
                <Card.Footer>
                  <Vote userId={currUserData.id} />
                </Card.Footer>
              ) : (
                ""
              )}
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
