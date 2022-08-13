import React, { useState, useEffect } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import EventItem from "./Event/event-item";
import SideNav from "./SiteElements/side-nav";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, affiliatedEvents } from "../actions/eventActions";
import CreatePost from "./Event/create-event";
import UserProfile from "./user-profile";
import Pagination from "./SiteElements/pagination";
import { useSearchParams } from "react-router-dom";

function MainDash() {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);
  const [affiliatedEv, setAffiliatedEv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    dispatch(getAllEvents(currentPage));
    dispatch(affiliatedEvents());
  }, [dispatch, currentPage]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [setSearchParams, currentPage]);

  var allEventsData = useSelector((eventReducer) => eventReducer.events.events);
  useEffect(() => {
    if (allEventsData.results) {
      setEventData(allEventsData.results);
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <Container>
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
                        eventCount={allEventsData.count}
                      />
                    </div>
                  ))
                  .reverse()
              : ""}
          </Col>

          <Col sm={3} className="post-cards recents">
            <Card className="mt-4">
              <Card.Body>
                <UserProfile />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Latest Activity</h6>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={allEventsData.count}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
}

export default MainDash;
