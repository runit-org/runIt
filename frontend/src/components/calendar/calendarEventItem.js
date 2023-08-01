import React, { useContext } from "react";
import { Card, Table } from "react-bootstrap";
import { Calendar, Geomark } from "../../layouts/icons";
import { DisplayImage } from "../../layouts/userDisplayImg";
import { DayEventsHandler } from "./utilities/actionHandler";
import { CalendarContext } from "../../context/calendarProvider";

function CalendarEventItem(props) {
  const { currentDay } = useContext(CalendarContext);

  const calendarEvents = DayEventsHandler(
    props.userId,
    currentDay.getDate(),
    currentDay.getMonth() + 1,
    currentDay.getFullYear()
  );

  return (
    <>
      {calendarEvents && calendarEvents.length > 0 ? (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Event Date</th>
              <th>Time to event</th>
            </tr>
          </thead>
          <tbody>
            {calendarEvents.map((item, i) => {
              return (
                <>
                  <tr>
                    <td>
                      {" "}
                      <DisplayImage image={item.gravatarImage} />
                    </td>
                    <td>{item.title}</td>
                    <td> {item.eventDateString}</td>
                    <td> {item.timeToEvent}</td>
                  </tr>
                  {/*  <Card key={i} className="calender-event-card">
                    <Card.Body>
                      <div className="row">
                        <div className="col-xl-1 col-lg-2 col-md-2 col-sm-1">
                          <DisplayImage image={item.gravatarImage} />
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
                  </Card> */}
                </>
              );
            })}
          </tbody>
        </Table>
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
