import { Link } from "react-router-dom";

export const Username = ({ username, size }) => {
  return (
    <Link
      to={{
        pathname: "/profile/settings",
        search: `user=${username}`,
      }}
    >
      {size === "sm" ? (
        <span className="username_tags align-self-center">@{username}</span>
      ) : (
        <>@{username}</>
      )}
    </Link>
  );
};
