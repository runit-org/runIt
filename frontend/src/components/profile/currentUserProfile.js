import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../../services/actions/userActions";
import { DisplayImage } from "../../layouts/user/userDisplayImg";
import { UserCardInfo, VoteBadge } from "./helper/profileBuilder";
import { Username } from "../../layouts/user/username";
import { VerifiedRender } from "../../routes/verifiedRender";
import UserStatus from "./userStatus";
import { Loading } from "../../layouts/loader";

function CurrentUserProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile.data
  );

  if (!currProfile || Object.keys(currProfile).length === 0) {
    return <Loading />;
  }
  const {
    gravatarImage,
    username,
    email,
    totalVote,
    last_login,
    numParticipatedEvents,
  } = currProfile || {};

  return (
    <>
      {currProfile && (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <DisplayImage image={gravatarImage} />
            <div className="ms-3">
              <Username username={username} />
              <small className="d-block text-muted">{email}</small>
            </div>

            <div className="position-absolute top-0 end-0 p-1">
              <VoteBadge votes={totalVote} />
            </div>
          </div>

          <VerifiedRender>
            <div className="my-3">
              <UserStatus />
            </div>
          </VerifiedRender>
          <div className="mt-3 ">
            <UserCardInfo
              lastLogin={last_login}
              numParticipatedEvents={numParticipatedEvents}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentUserProfile;
