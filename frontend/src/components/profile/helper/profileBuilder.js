import { Badge } from "react-bootstrap";
import {
  Comment,
  Event,
  Feedback,
  Notification,
  User,
} from "../../../layouts/icons";

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

export const TimelineIcons = (props) => {
  const { icons } = props;

  const types = {
    Event: <Event />,
    Comment: <Comment />,
    Account: <User />,
    Notification: <Notification />,
    Feedback: <Feedback />,
  };
  const selectedType = types[icons] || {};

  if (!selectedType) {
    return null;
  }

  return <> {selectedType}</>;
};

export const FeedbackTypes = () => {
  const feedbackType = [
    { title: "Support", value: "support" },
    { title: "Feedback", value: "feedback" },
  ];
  const category = [
    { title: "Event", value: "event" },
    { title: "Comment", value: "comment" },
    { title: "Account", value: "account" },
    { title: "Friends", value: "friends" },
    { title: "Other", value: "other" },
  ];

  return { feedbackType, category };
};
