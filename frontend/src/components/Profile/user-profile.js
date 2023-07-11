import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/user-context";
import { DisplayImage } from "../../layouts/user-displayimg";
import UserProfileHandler from "./utilities/action-handlers";
import { UserCardInfo, VoteBadge } from "./utilities/profile-builder.js";
import Vote from "./vote";

function UserProfile(props) {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const userContext = useContext(UserContext);

  const user = UserProfileHandler(
    param ? param : userContext.currentUser.username
  );

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
            <DisplayImage image={user.gravatarImage} />

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
            <UserCardInfo
              status={user.statusMessage}
              lastLogin={user.last_login}
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
