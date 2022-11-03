import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getUserProfile } from "../../actions/securityActions";
import img from "../../logo192.png";

function UserProfile(props) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    dispatch(getUserProfile(param ? param : props.username));
  }, [dispatch, props.username, param]);

  var profile = useSelector(
    (securityReducer) => securityReducer.security.userProfile
  );

  useEffect(() => {
    if (profile) {
      setUserProfile(profile.data);
    }
    if (props.userData && userProfile) {
      props.userData(userProfile);
    }
  }, [profile, userProfile, props]);

  return (
    <>
      {userProfile ? (
        <>
          <div className="d-flex align-items-center userInfo-div">
            <img src={img} className="userProf-img" alt="use profile" />
            <div className="ms-4">
              <Link
                to={{
                  pathname: "/profile",
                  search: `user=${userProfile.username}`,
                }}
              >
                @{userProfile.username}
              </Link>

              <small className="d-block text-muted">{userProfile.email}</small>
            </div>
          </div>
          <div className="mt-4">
            <hr />
            <p>Total Votes: {userProfile.totalVote}</p>{" "}
            <p>Vote Status: {userProfile.voteStatus}</p>{" "}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default UserProfile;
