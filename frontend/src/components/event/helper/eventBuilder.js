import { Badge } from "react-bootstrap";
import JoinEvent from "../joinEvent";
import {
  ACCEPTED,
  CANCELLED,
  FINISHED,
  ONGOING,
  OWNER,
  PENDING,
  PENDING_START,
  REJECTED,
} from "./eventTypes";

export const BadgeItem = (props) => {
  const { eventStatus, content } = props;
  const badgeStyle =
    eventStatus === FINISHED
      ? {
          backgroundColor: "#dbeafe",
          color: "#1e40af",
        }
      : eventStatus === ONGOING
      ? {
          backgroundColor: "#ffedd5",
          color: "#9a3412",
        }
      : eventStatus === PENDING_START
      ? {
          backgroundColor: "#cffafe",
          color: "#155e75",
        }
      : eventStatus === CANCELLED
      ? {
          backgroundColor: "#f1f5f9",
          color: "#1e293b",
        }
      : "";

  return (
    <>
      <Badge bg="" id="badgeItem" style={badgeStyle}>
        {eventStatus === ONGOING ? (
          <>
            Underway
            <span className="animate_pulse" />
            <span className="pulse_dot" />
          </>
        ) : eventStatus === FINISHED ? (
          <>Ended</>
        ) : eventStatus === CANCELLED ? (
          <>Cancelled</>
        ) : (
          <> in {content}</>
        )}
      </Badge>
    </>
  );
};

export const StatusBadge = (props) => {
  const { joinedStatus } = props.eventData;
  const badgeStyles = {
    ACCEPTED: { backgroundColor: "#DFF2BF", color: "#4F8A10" },
    PENDING: { backgroundColor: "#e5edff", color: "#5850ec" },
    REJECTED: { backgroundColor: "#FFD2D2", color: "#D8000C" },
  };

  const selectedBadgeStyle = badgeStyles[joinedStatus] || {};

  if (!selectedBadgeStyle) {
    return null;
  }

  return (
    <div>
      <Badge bg="" style={selectedBadgeStyle}>
        {joinedStatus === ACCEPTED
          ? "Joined"
          : joinedStatus === PENDING
          ? "Requested"
          : joinedStatus === REJECTED
          ? "Rejected"
          : ""}
      </Badge>
    </div>
  );
};

export const RequestBtn = (props) => {
  const joinedStatus = props.eventData.joinedStatus;
  const eventStatus = props.eventData.eventStatus;
  const { id, title, btnStyleFull, userName, fullStatus } = props.eventData;

  const isUserAllowedToJoin =
    ![ACCEPTED, PENDING, REJECTED, OWNER].includes(joinedStatus) &&
    ![FINISHED, CANCELLED].includes(eventStatus) &&
    !fullStatus;

  return (
    <>
      {isUserAllowedToJoin ? (
        <JoinEvent
          eventId={id}
          eventTitle={title}
          btnStyleFull={btnStyleFull}
          userName={userName}
        />
      ) : fullStatus && joinedStatus !== ACCEPTED ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#e2e8f0", color: "#475569" }}>
            Full
          </Badge>
        </div>
      ) : null}
    </>
  );
};

export const Accepted = (eventMembers) => {
  let acceptedMembers = eventMembers.filter(
    (member) => member.status === ACCEPTED
  );

  return acceptedMembers;
};

export const Pending = (eventMembers, currentUser) => {
  let pendingMembers = eventMembers.filter(
    (member) => member.status === PENDING && member.userId !== currentUser
  );

  return pendingMembers;
};

export const handleFormInputs = (value, setFormValue, field) => {
  setFormValue((prev) => {
    return {
      ...prev,
      [field]: value,
    };
  });
};
