import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getUserProfile } from "../../actions/userActions";
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
    (securityReducer) => securityReducer.users.userProfile
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
              {userProfile.username === localStorage.getItem("username") ? (
                <Badge id="vote_badge"> votes: {userProfile.totalVote}</Badge>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default UserProfile;
