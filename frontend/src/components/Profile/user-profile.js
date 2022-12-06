import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/user-context";
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  width="14"
                  height="14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                Melbourne, Australia
              </span>
            </small>
            <small className="d-block text-muted">
              <span className="d-inline-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  width="14"
                  height="14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
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
