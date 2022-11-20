import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../actions/eventActions";
import CreatePost from "../Event/create-event";
import Pagination from "../SiteElements/pagination";
import { useSearchParams, useLocation } from "react-router-dom";
import { SearchParam } from "../Utilities/search-param";
import EventItemCard from "../Event/event-item-card";
import CurrentUserProfile from "../Profile/current-user-profile";

function MainDash() {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams({});
  const { state } = useLocation();

  let pageId = SearchParam();

  useEffect(() => {
    dispatch(getAllEvents(pageId ? pageId : 1));
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
              <CreatePost />
              <Row xs={1} sm={1} md={2}>
                {eventData
                  ? eventData.map((event, index) => (
                      <Col key={index}>
                        <EventItemCard
                          eventData={event}
                          eventCount={allEventsData.count}
                        />
                      </Col>
                    ))
                  : ""}
              </Row>
            </div>
            {allEventsData.count > 10 ? (
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
                <CurrentUserProfile
                  username={localStorage.getItem("username")}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDash;
