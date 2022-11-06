import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import UserProfile from "../Profile/user-profile";
import Vote from "../Profile/vote";

function ProfileDash() {
  const [owner, setOwner] = useState(false);
  const [currUserData, setCurrUserData] = useState([]);

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
                <div className="d-flex justify-content-between">
                  <span>
                    <UserProfile userData={child_data} />
                  </span>
                  {!owner ? (
                    <span>
                      <Vote
                        userId={currUserData.id}
                        username={currUserData.username}
                        voteCount={currUserData.totalVote}
                        voteStatus={currUserData.voteStatus}
                      />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
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
