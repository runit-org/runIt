import { Badge } from "react-bootstrap";

export const VoteBadge = (props) => {
  return (
    <>
      <Badge id="vote_badge">{props.votes} Votes</Badge>
    </>
  );
};

export const UserCardInfo = (props) => {
  return (
    <div
      className={`d-flex flex-column   ${
        props.size !== "sm" ? `gap-1 my-2` : ""
      }`}
    >
      <small
        className={`d-block text-muted ${
          props.size !== "sm" ? `content_sm5` : ``
        }`}
      >
        Participated in <strong>{props.numParticipatedEvents}</strong> event(s)
      </small>
      {props.lastLogin ? (
        <small
          className={`d-block text-muted ${
            props.size !== "sm" ? `content_sm5` : ``
          }`}
        >
          Last active: {new Date(props.lastLogin).toLocaleDateString()}
        </small>
      ) : (
        ""
      )}
    </div>
  );
};
