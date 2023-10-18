import React from "react";
import { DisplayImage } from "../../layouts/user/userDisplayImg";
import { UserCardInfo } from "./helper/profileBuilder.js";
import Vote from "./vote";
import { Username } from "../../layouts/user/username";
import { useVerifyAuthUser } from "../../hooks/useCheckCurrUser";
import { Loading } from "../../layouts/loader";
import { VerifiedRender } from "../../routes/verifiedRender";

function UserProfile() {
  const { user } = useVerifyAuthUser();
  if (!user || Object.keys(user).length === 0) {
    return <Loading />;
  }
  const { gravatarImage, username, email, last_login, numParticipatedEvents } =
    user;

  return (
    <div className="w-100">
      <div className="d-flex align-items-center userInfo-div">
        <DisplayImage image={gravatarImage} />
        <div className="ms-3">
          <Username username={username} />
          <small className="d-block text-muted">{email}</small>
        </div>

        <VerifiedRender>
          <div className="position-absolute top-0 end-0 p-1">
            <Vote user={user} fullW={false} />
          </div>
        </VerifiedRender>
      </div>

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
