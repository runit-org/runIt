import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../actions/securityActions";
import img from "../logo192.png";

function UserProfile(props) {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    dispatch(getUserProfile(localStorage.getItem("username")));
  }, [dispatch]);

  var profile = useSelector(
    (securityReducer) => securityReducer.security.userProfile
  );

  useEffect(() => {
    if (profile) {
      setUserProfile(profile.data);
    }
  }, [profile]);
  return (
    <>
      {userProfile ? (
        <div className="d-flex align-items-center">
          <img src={img} className="userProf-img" alt="use prof" />
          <div className="ms-4">
            <strong>@{userProfile.username}</strong>
            <small className="d-block text-muted">{userProfile.email}</small>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UserProfile;
