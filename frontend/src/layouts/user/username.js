import { Link } from "react-router-dom";
import { PROFILE, SETTINGS } from "../../routes/routes";

export const Username = ({ username, size }) => {
  return (
    <Link
      to={{
        pathname: `/${PROFILE}/${SETTINGS}`,
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
