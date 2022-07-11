import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import EventItem from "./Event/EventItem";
import SideNav from "./SiteElements/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../actions/eventActions";
import CreatePost from "./Event/CreateEvent";

function MainDash() {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  var allEventsData = useSelector((eventReducer) => eventReducer.events.data);
  useEffect(() => {
    setEventData(allEventsData);
  }, [allEventsData]);

  return (
    <div className="content">
      {/* <Row className="row justify-content-center">Event Data</Row> */}

      <Row>
        <Col className="post-cards">
          {eventData.map((event, index) => (
            <div key={index}>
              <EventItem
                eventTitle={event.title}
                eventDetails={event.details}
                postedBy={event.userName}
                createdTime={event.humanTimeDiffCreatedAt}
                eventId={event.id}
                userId={event.user}
              />
            </div>
          ))}
        </Col>

        <Col sm={3} className="post-cards recents">
        <CreatePost />
          <Card>
            <Card.Body>
              <Card.Title className="text-muted mb-4">Recents</Card.Title>
              {eventData.length > 4
                ? eventData
                    .slice(Math.max(eventData.length - 4, 0))
                    .map((event) => (
                      <div className="mb-3" key={event.id}>
                        <SideNav eventTitle={event.title} />
                      </div>
                    ))
                : eventData.map((event) => (
                    <div className="mb-3" key={event.id}>
                      <SideNav eventTitle={event.title} />
                    </div>
                  ))}
              {/* {eventData.map((event) => (
                <div className="mb-3" key={event.id}>
                  <SideNav eventTitle={event.title} />
                </div>
              ))} */}
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title className="text-muted mb-4">Your Events</Card.Title>
              {eventData
                .filter(
                  (eventData) => eventData.userName == localStorage.username
                )
                .map((event, index) => (
                  <div className="mb-3" key={index}>
                    <SideNav eventTitle={event.title} />
                  </div>
                ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MainDash;
