import React from "react";
import { DisplayImage } from "../../layouts/userDisplayImg";
import { UserCardInfo, VoteBadge } from "./helper/profileBuilder.js";
import Vote from "./vote";
import { Username } from "../../layouts/username";
import UserStatus from "./userStatus";
import { useVerifyAuthUser } from "../../hooks/useCheckCurrUser";
import { Loading } from "../../layouts/loader";
import { VerifiedRender } from "../../routes/verifiedRender";

function UserProfile() {
  const { authUser, user } = useVerifyAuthUser();
  if (!user || Object.keys(user).length === 0) {
    return <Loading />;
  }
  const {
    gravatarImage,
    username,
    email,
    totalVote,
    statusMessage,
    last_login,
    numParticipatedEvents,
  } = user;

  return (
    <div className="w-100">
      <div className="d-flex align-items-center userInfo-div">
        <DisplayImage image={gravatarImage} />
        <div className="ms-3">
          <Username username={username} />
          <small className="d-block text-muted">{email}</small>
        </div>

        <div className="position-absolute top-0 end-0 p-1">
          {!authUser ? (
            <VerifiedRender>
              <Vote user={user} fullW={false} />
            </VerifiedRender>
          ) : (
            <VoteBadge votes={totalVote} />
          )}
        </div>
      </div>

      <VerifiedRender>
        {authUser ? (
          <div className="my-3">
            <UserStatus />
          </div>
        ) : (
          <small className="d-block text-muted content_sm5">
            {statusMessage}
          </small>
        )}
      </VerifiedRender>

      <div className="mt-3 ">
        <UserCardInfo
          lastLogin={last_login}
          numParticipatedEvents={numParticipatedEvents}
        />
      </div>
    </div>
  );
}

export default UserProfile;
