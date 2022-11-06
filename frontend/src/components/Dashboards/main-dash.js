import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import EventItem from "../Event/event-item";
import RecentsCard from "../SiteElements/recents-card";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../actions/eventActions";
import CreatePost from "../Event/create-event";
import UserProfile from "../Profile/user-profile";
import Pagination from "../SiteElements/pagination";
import { useSearchParams, useLocation } from "react-router-dom";
import { SearchParam } from "../Utilities/search-param";
import EventItemCard from "../Event/event-item-card";

function MainDash() {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams({});
  const { state } = useLocation();

  let pageId = SearchParam();

  useEffect(() => {
    dispatch(getAllEvents(pageId));
  }, [dispatch, pageId]);

  useEffect(() => {
    if (state) {
      const { id } = state;
      setCurrentPage(id);
    }
  }, [state]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [setSearchParams, currentPage]);

  var allEventsData = useSelector((eventReducer) => eventReducer.events.events);
  useEffect(() => {
    if (allEventsData.results) {
      setEventData(allEventsData.results);
    }
  }, [allEventsData]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content">
          <Container>
            <div>
              <Card className="create-post-card">
                <CreatePost />
              </Card>
              <Row xs={1} sm={2} md={3}>
                {eventData
                  ? eventData.map((event, index) => (
                      <Col key={index}>
                        {/* <EventItem
                        eventData={event}
                        eventCount={allEventsData.count}
                      /> */}
                        <EventItemCard
                          eventData={event}
                          eventCount={allEventsData.count}
                        />
                      </Col>
                    ))
                  : ""}
              </Row>
            </div>
            {allEventsData.count > 0 ? (
              <Pagination
                postsPerPage={postPerPage}
                totalPosts={allEventsData.count}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              ""
            )}
          </Container>
        </div>

        <div className="sidebar">
          <div className="sidebar-wrapper">
            <Card style={{ maxWidth: "20rem" }}>
              <Card.Body>
                <UserProfile username={localStorage.getItem("username")} />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Latest Activity</h6>
                {eventData.length === 0 ? (
                  <h6>No recent events</h6>
                ) : eventData.length > 4 ? (
                  eventData
                    .slice(Math.max(eventData.length - 4, 0))
                    .map((event) => (
                      <div className="mb-3" key={event.id}>
                        <RecentsCard
                          eventTitle={event.title}
                          time={event.humanTimeDiffCreatedAt}
                        />
                      </div>
                    ))
                ) : (
                  eventData.map((event) => (
                    <div className="mb-3" key={event.id}>
                      <RecentsCard
                        eventTitle={event.title}
                        time={event.humanTimeDiffCreatedAt}
                      />
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDash;
