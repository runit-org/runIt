import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/user-context";
import { Geomark, Star } from "../SiteElements/icons";
import UserProfileHandler from "./utilities/action-handlers";
import { VoteBadge } from "./utilities/profile-builder.js";
import Vote from "./vote";

function UserProfile(props) {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const contextUser = useContext(UserContext);

  const user = UserProfileHandler(param ? param : contextUser);

  useEffect(() => {
    if (props.userData && user) {
      props.userData(user);
    }
  }, [user, props]);

  return (
    <>
      {user ? (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <img
              src={user.gravatarImage}
              className="userProf-img"
              alt="use profile"
            />
            <div className="ms-3">
              <Link
                to={{
                  pathname: "/profile",
                  search: `user=${user.username}`,
                }}
              >
                @{user.username}
              </Link>

              <small className="d-block text-muted">{user.email}</small>
            </div>
          </div>
          <div className="mt-3 ">
            <VoteBadge votes={user.totalVote} />
            <small className="d-block text-muted">
              <span className="d-inline-flex align-items-center">
                <Geomark />
                Melbourne, Australia
              </span>
            </small>
            <small className="d-block text-muted">
              <span className="d-inline-flex align-items-center">
                <Star />
                Last event created was in the past week
              </span>
            </small>
          </div>
          {user.username !== contextUser ? (
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
