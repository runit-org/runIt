import React, { useState, useEffect } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import EventItem from "./Event/event-item";
import SideNav from "./SiteElements/side-nav";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, affiliatedEvents } from "../actions/eventActions";
import CreatePostModal from "./Event/creat-event-modal";
import CreatePost from "./Event/create-event";

function MainDash() {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);
  const [affiliatedEv, setAffiliatedEv] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(affiliatedEvents());
  }, [dispatch]);

  var allEventsData = useSelector(
    (eventReducer) => eventReducer.events.events.results
  );
  useEffect(() => {
    if (allEventsData) {
      setEventData(allEventsData);
    }
  }, [allEventsData]);

  var affiliatedEventData = useSelector(
    (eventReducer) => eventReducer.events.affiliatedData.results
  );

  useEffect(() => {
    if (affiliatedEventData) {
      setAffiliatedEv(affiliatedEventData);
    }
  }, [affiliatedEventData]);

  // console.log(eventId)eventId

  return (
    <div className="content">
      <Container>
        {/* <Row className="row justify-content-center">Event Data</Row> */}

        <Row>
          <Col className="post-cards">
            <Card>
              <CreatePost />
            </Card>
            {eventData
              ? eventData
                  .map((event, index) => (
                    <div key={index}>
                      <EventItem
                        eventTitle={event.title}
                        eventDetails={event.details}
                        postedBy={event.userName}
                        createdTime={event.humanTimeDiffCreatedAt}
                        eventId={event.id}
                        userId={event.user}
                        maxMembers={event.maxMember}
                        eventAffiliated={affiliatedEv}
                      />
                    </div>
                  ))
                  .reverse()
              : ""}
          </Col>

          <Col sm={3} className="post-cards recents">
            {/* {eventData.length > 0 ? <CreatePostModal btnSize={"w-100"} /> : ""} */}

            <Card>
              <Card.Body>
                <Card.Title className="text-muted mb-4">Recents</Card.Title>
                {eventData.length == 0 ? (
                  <h6>No recent events</h6>
                ) : eventData.length > 4 ? (
                  eventData
                    .slice(Math.max(eventData.length - 4, 0))
                    .reverse()
                    .map((event) => (
                      <div className="mb-3" key={event.id}>
                        <SideNav
                          eventTitle={event.title}
                          time={event.humanTimeDiffCreatedAt}
                          detail={event.details}
                        />
                      </div>
                    ))
                ) : (
                  eventData
                    .map((event) => (
                      <div className="mb-3" key={event.id}>
                        <SideNav
                          eventTitle={event.title}
                          time={event.humanTimeDiffCreatedAt}
                          detail={event.details}
                        />
                      </div>
                    ))
                    .reverse()
                )}
                {/* {eventData.map((event) => (
                <div className="mb-3" key={event.id}>
                  <SideNav eventTitle={event.title} />
                </div>
              ))} */}
              </Card.Body>
            </Card>
            {/*  <Card className="mt-4">
            <Card.Body>
              <Card.Title className="text-muted mb-4">Your Events</Card.Title>
              {eventData
                .filter(
                  (eventData) => eventData.userName == localStorage.username
                )
                .map((event, index) => (
                  <div className="mb-3" key={index}>
                    <SideNav eventTitle={event.title} time={event.humanTimeDiffCreatedAt} detail={event.details} />
                  </div>
                )).reverse()}
            </Card.Body>
          </Card> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainDash;
