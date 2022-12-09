import { Badge } from "react-bootstrap";
import JoinEvent from "../join-event";
import {
  ACCEPTED,
  CANCELLED,
  FINISHED,
  ONGOING,
  OWNER,
  PENDING,
  PENDING_START,
  REJECTED,
} from "./types";

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
      <div>
        <Badge bg="" id="badgeItem" style={badgeStyle}>
          {props.eventStatus === ONGOING ? (
            <>
              Underway
              <span className="animate_pulse"></span>
              <span className="pulse_dot"></span>
            </>
          ) : props.eventStatus === FINISHED ? (
            <>
              Ended
              <span className="animate_pulse"></span>
              <span className="pulse_dot"></span>
            </>
          ) : props.eventStatus === CANCELLED ? (
            <>
              Cancelled
              <span className="animate_pulse"></span>
              <span className="pulse_dot"></span>
            </>
          ) : (
            <> in {props.content}</>
          )}
        </Badge>
      </div>
    </>
  );
};

export const StatusBadge = (props) => {
  const statusOnEvent = props.joinedStatus;

  return (
    <>
      {statusOnEvent === ACCEPTED ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#DFF2BF", color: "#4F8A10" }}>
            Joined
          </Badge>
        </div>
      ) : statusOnEvent === PENDING ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#e5edff", color: "#5850ec" }}>
            Requested
          </Badge>
        </div>
      ) : statusOnEvent === REJECTED ? (
        <div>
          <Badge bg="" style={{ backgroundColor: "#FFD2D2", color: "#D8000C" }}>
            Unapproved
          </Badge>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export const RequestBtn = (props) => {
  const statusOnEvent = props.joinedStatus;

  return (
    <>
      {statusOnEvent !== ACCEPTED &&
      statusOnEvent !== PENDING &&
      statusOnEvent !== REJECTED &&
      statusOnEvent !== OWNER ? (
        <JoinEvent
          eventId={props.JoinEvent.id}
          eventTitle={props.JoinEvent.title}
          btnStyleFull={props.btnStyleFull}
          userName={props.JoinEvent.userName}
        />
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
