import { Badge } from "react-bootstrap";

export const VoteBadge = (props) => {
  return (
    <>
      <Badge id="vote_badge" className="mb-2">
        {props.votes > 1 ? <>{props.votes} votes</> : <>{props.votes} vote</>}
      </Badge>
    </>
  );
};

export const UserCardInfo = (props) => {
  return (
    <>
      {props.status ? (
        <small className="d-block text-muted content_sm5">
          <span className="d-inline-flex align-items-center">
            {props.status}
          </span>
        </small>
      ) : (
        ""
      )}
      {props.lastLogin ? (
        <small className="d-block text-muted content_sm5">
          <span className="d-inline-flex align-items-center">
            Last available: {new Date(props.lastLogin).toLocaleDateString()}
          </span>
        </small>
      ) : (
        ""
      )}
    </>
  );
};
