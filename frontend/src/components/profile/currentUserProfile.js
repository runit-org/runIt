import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../../services/actions/userActions";
import { DisplayImage } from "../../layouts/userDisplayImg";
import { UserCardInfo, VoteBadge } from "./utilities/profileBuilder";
import { Username } from "../../layouts/username";

function CurrentUserProfile() {
  const dispatch = useDispatch();
  const [currUserProfile, setCurrUserProfile] = useState({});

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile
  );

  useEffect(() => {
    if (currProfile) {
      setCurrUserProfile(currProfile.data);
    }
  }, [currProfile]);

  return (
    <>
      {currUserProfile ? (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <DisplayImage image={currUserProfile.gravatarImage} />
            <div className="ms-3">
              <Username username={currUserProfile.username} />
              <small className="d-block text-muted">
                {currUserProfile.email}
              </small>
            </div>
          </div>
          <div className="mt-3">
            <VoteBadge votes={currUserProfile.totalVote} />
            <UserCardInfo lastLogin={currUserProfile.last_login} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CurrentUserProfile;
