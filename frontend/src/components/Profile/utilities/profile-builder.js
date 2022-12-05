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
