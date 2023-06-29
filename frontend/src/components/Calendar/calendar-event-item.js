import React from "react";
import { Card } from "react-bootstrap";
import { Calendar, Geomark } from "../../Layouts/icons";

function CalendarEventItem(props) {
  return (
    <>
      {props.calendarEvents.length > 0 ? (
        props.calendarEvents.map((item, i) => {
          return (
            <Card key={i} className="calender-event-card">
              <Card.Body>
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-2 col-sm-1">
                    <img
                      src="https://www.gravatar.com/avatar/04678e8bacf37f21ebfbcdddefad9468?d=retro"
                      alt="user-profileImage"
                    />
                  </div>
                  <div className="col-xl-11 col-lg-10 col-md-10 col-sm-12">
                    <h6>{item.title}</h6>
                    <div className="details_textarea">
                      <span className="d-flex">
                        <Calendar />
                        <small className="text-muted">
                          {item.eventDateString}
                        </small>
                      </span>

                      <span className="d-flex">
                        <Geomark />
                        <small className="text-muted">
                          {item.timeToEvent}{" "}
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Card className="calender-event-card">
          <Card.Body>
            <div className="details_textarea">
              <h6 className="p-0 m-0">No events scheduled</h6>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default CalendarEventItem;
