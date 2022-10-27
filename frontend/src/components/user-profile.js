import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../actions/securityActions";
import img from "../logo192.png";
import PopoverProf from "./SiteElements/popover";

function UserProfile(props) {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    dispatch(getUserProfile(props.username));
  }, [dispatch, props.username]);

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
        <div className="d-flex align-items-center userInfo-div">
          <img src={img} className="userProf-img" alt="use profile" />
          <div className="ms-4">
            <PopoverProf data={userProfile}>
              <Button variant="link">@{userProfile.username}</Button>
            </PopoverProf>

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
