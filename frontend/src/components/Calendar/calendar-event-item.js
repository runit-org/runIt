import React from "react";
import { Card } from "react-bootstrap";

function CalendarEventItem(props) {
  return (
    <Card className="calender-event-card">
      <Card.Body>
        {props.calendarEvents.length > 0 ? (
          props.calendarEvents.map((item, i) => {
            return (
              <div key={i} className="row">
                <div className="col-xl-1 col-lg-2 col-md-2 col-sm-4">
                  <div className="image-wrapper">
                    <img
                      src="https://www.gravatar.com/avatar/04678e8bacf37f21ebfbcdddefad9468?d=retro"
                      alt="user-profileImage"
                    />
                  </div>
                </div>
                <div className="col-xl-11 col-lg-10 col-md-10 col-sm-8">
                  <h6>{item.title}</h6>
                  <div className="details_textarea">
                    <small className="text-muted">{item.eventDateString}</small>
                    <small className="text-muted">{item.timeToEvent} </small>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="details_textarea">
            <h6 className="p-0 m-0">No events scheduled</h6>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default CalendarEventItem;
