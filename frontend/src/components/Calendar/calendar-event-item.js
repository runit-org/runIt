import React from "react";
import { Card } from "react-bootstrap";
import { Mention } from "../Utilities/mention";

function CalendarEventItem(props) {
  return (
    <>
      {props.calendarEvents.length > 0 ? (
        props.calendarEvents.map((item, i) => {
          return (
            <Card key={i} className="event-card">
              <Card.Header>
                <div className="d-flex justify-content-between"></div>
              </Card.Header>
              <Card.Body>
                <div className="details_textarea">
                  <h4>{item.title}</h4>
                  <span
                    className="content_sm1"
                    dangerouslySetInnerHTML={{
                      __html: item.details
                        ? Mention(item.details)
                        : item.details,
                    }}
                  />
                </div>
                <div className="details_textarea">
                  <h6>Details</h6>
                  <small className="text-muted">
                    Host:{" "}
                    <a
                      href={`/calendar?user=${item.userName}`}
                      className="text-decoration-none"
                    >
                      @{item.userName}
                    </a>
                  </small>
                  <br />
                  <small className="text-muted">
                    Posted: {item.humanTimeDiffCreatedAt} ago
                  </small>
                  <br />
                  <small className="text-muted">
                    Time: {item.timeToEvent}{" "}
                  </small>
                </div>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Card className="event-card">
          <Card.Header>
            <div className="d-flex justify-content-between"></div>
          </Card.Header>
          <Card.Body>
            <div className="details_textarea">
              <span className="content_sm1"> No events scheduled</span>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default CalendarEventItem;
