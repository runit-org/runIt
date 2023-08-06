import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userProvider";
import { DisplayImage } from "../../layouts/userDisplayImg";
import UserProfileHandler from "./utilities/actionHandlers";
import { UserCardInfo, VoteBadge } from "./utilities/profileBuilder.js";
import Vote from "./vote";
import { Username } from "../../layouts/username";
import UserStatus from "./userStatus";

function UserProfile() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const userContext = useContext(UserContext);
  const user = UserProfileHandler(
    param ? param : userContext.currentUser.username
  );
  const authUser = user
    ? user.username === userContext.currentUser.username
    : "";

  return (
    <>
      {user ? (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <DisplayImage image={user.gravatarImage} />
            <div className="ms-3">
              <Username username={user.username} />
              <small className="d-block text-muted">{user.email}</small>
            </div>

            <div className="position-absolute top-0 end-0 p-1">
              {!authUser ? (
                <Vote user={user} fullW={false} />
              ) : (
                <VoteBadge votes={user.totalVote} />
              )}
            </div>
          </div>

          {authUser ? (
            <div className="my-3">
              <UserStatus />
            </div>
          ) : (
            <small className="d-block text-muted content_sm5">
              {user.statusMessage}
            </small>
          )}

          <div className="mt-3 ">
            <UserCardInfo
              lastLogin={user.last_login}
              numParticipatedEvents={user.numParticipatedEvents}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UserProfile;
