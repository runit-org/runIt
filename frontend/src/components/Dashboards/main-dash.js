import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CreatePost from "../Event/create-event";
import Pagination from "../SiteElements/pagination";
import { useSearchParams, useLocation } from "react-router-dom";
import { SearchParam } from "../Utilities/search-param";
import EventItemCard from "../Event/event-item-card";
import CurrentUserProfile from "../Profile/current-user-profile";
import { EventHandler } from "../Event/utilities/action-handlers";

function MainDash() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({});
  const { state } = useLocation();

  let pageId = SearchParam();
  const eventData = EventHandler(pageId);

  useEffect(() => {
    if (state) {
      const { id } = state;
      setCurrentPage(id);
    }
  }, [state]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [setSearchParams, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content">
          <Container>
            <div>
              <CreatePost />
              <Row xs={1} sm={1} md={2}>
                {eventData.results
                  ? eventData.results.map((event, index) => (
                      <Col key={index}>
                        <EventItemCard eventData={event} />
                      </Col>
                    ))
                  : ""}
              </Row>
            </div>
            {eventData.count > 10 ? (
              <Pagination
                postsPerPage={postPerPage}
                totalPosts={eventData.count}
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
                <CurrentUserProfile />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDash;
