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
  const badgeStyle =
    props.eventStatus === FINISHED
      ? {
          backgroundColor: "#dbeafe",
          color: "#1e40af",
        }
      : props.eventStatus === ONGOING
      ? {
          backgroundColor: "#ffedd5",
          color: "#9a3412",
        }
      : props.eventStatus === PENDING_START
      ? {
          backgroundColor: "#cffafe",
          color: "#155e75",
        }
      : props.eventStatus === CANCELLED
      ? {
          backgroundColor: "#f1f5f9",
          color: "#1e293b",
        }
      : "";

  return (
    <>
      <Badge bg="" id="badgeItem" style={badgeStyle}>
        {props.eventStatus === ONGOING ? (
          <>
            Underway
            <span className="animate_pulse" />
            <span className="pulse_dot" />
          </>
        ) : props.eventStatus === FINISHED ? (
          <>Ended</>
        ) : props.eventStatus === CANCELLED ? (
          <>Cancelled</>
        ) : (
          <> in {props.content}</>
        )}
      </Badge>
    </>
  );
};

export const StatusBadge = (props) => {
  const status = props.eventData.joinedStatus;

  return (
    <>
      {status === ACCEPTED ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#DFF2BF", color: "#4F8A10" }}>
            Joined
          </Badge>
        </div>
      ) : status === PENDING ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#e5edff", color: "#5850ec" }}>
            Requested
          </Badge>
        </div>
      ) : status === REJECTED ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#FFD2D2", color: "#D8000C" }}>
            Rejected
          </Badge>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export const RequestBtn = (props) => {
  const userStatusOnEvent = props.eventData.joinedStatus;
  const statusOnEvent = props.eventData.eventStatus;

  return (
    <>
      {userStatusOnEvent !== ACCEPTED &&
      userStatusOnEvent !== PENDING &&
      userStatusOnEvent !== REJECTED &&
      userStatusOnEvent !== OWNER &&
      statusOnEvent !== FINISHED &&
      statusOnEvent !== CANCELLED ? (
        <JoinEvent
          eventId={props.eventData.id}
          eventTitle={props.eventData.title}
          btnStyleFull={props.btnStyleFull}
          userName={props.eventData.userName}
        />
      ) : props.eventData.fullStatus ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#e2e8f0", color: "#475569" }}>
            Full
          </Badge>
        </div>
      ) : (
        ""
      )}
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
