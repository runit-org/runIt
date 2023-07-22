import { Badge } from "react-bootstrap";

export const VoteBadge = (props) => {
  return (
    <>
      <Badge id="vote_badge" className="mb-2">
        <>
          {props.votes > 0 ? "+" : ""}
          {props.votes} rating
        </>
      </Badge>
    </>
  );
};

export const UserCardInfo = (props) => {
  return (
    <div className="d-flex flex-column gap-1">
      {props.status ? (
        <small className="d-block text-muted content_sm5">{props.status}</small>
      ) : (
        ""
      )}
      <small className="d-block text-muted content_sm5">
        Participated in {props.numParticipatedEvents} event(s)
      </small>
      {props.lastLogin ? (
        <small className="d-block text-muted content_sm5">
          Last active: {new Date(props.lastLogin).toLocaleDateString()}
        </small>
      ) : (
        ""
      )}
    </div>
  );
};
