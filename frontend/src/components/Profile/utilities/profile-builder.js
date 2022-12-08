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

export const UserCardInfo = () => {
  return (
    <>
      <small className="d-block text-muted">
        <span className="d-inline-flex align-items-center">
          Melbourne, Australia
        </span>
      </small>
      <small className="d-block text-muted">
        <span className="d-inline-flex align-items-center">
          Last event created was in the past week
        </span>
      </small>
    </>
  );
};
