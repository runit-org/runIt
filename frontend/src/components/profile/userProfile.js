import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userProvider";
import { DisplayImage } from "../../layouts/userDisplayImg";
import UserProfileHandler from "./utilities/actionHandlers";
import { UserCardInfo, VoteBadge } from "./utilities/profileBuilder.js";
import Vote from "./vote";
import { Username } from "../../layouts/username";

function UserProfile() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const userContext = useContext(UserContext);

  const user = UserProfileHandler(
    param ? param : userContext.currentUser.username
  );

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
          </div>
          <div className="mt-3 ">
            <VoteBadge votes={user.totalVote} />
            <UserCardInfo
              status={user.statusMessage}
              lastLogin={user.last_login}
              numParticipatedEvents={user.numParticipatedEvents}
            />
          </div>
          {user.username !== userContext.currentUser.username ? (
            <div className="mt-4">
              <Vote
                userId={user.id}
                username={user.username}
                voteStatus={user.voteStatus}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UserProfile;
