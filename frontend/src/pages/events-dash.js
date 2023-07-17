import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CreatePost from "../components/Event/create-event";
import Pagination from "../layouts/pagination";
import { useSearchParams, useLocation } from "react-router-dom";
import EventItemCard from "../components/Event/event-item-card";
import CurrentUserProfile from "../components/Profile/current-user-profile";
import { EventHandler } from "../components/Event/utilities/action-handlers";
import SuggestItem from "../components/Suggestions/suggest-item";
import { usePageId } from "../hooks/usePageId";

function MainDash() {
  //pagination and event api
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({});
  const { state } = useLocation();

  let pageId = usePageId();
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

  //suggestions
  const [suggestedData, setSuggestedData] = useState({});

  const child_data = (data) => {
    if (data) {
      setSuggestedData(data);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container" id="main">
        <div className="sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar_left">
              <SuggestItem userData={child_data} />
            </div>
          </div>
        </div>
        <div className="content">
          <Container>
            <div>
              <CreatePost suggestion={suggestedData} />
              <Row xs={1} sm={1} md={1}>
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
          <div className="sidebar-wrapper ">
            <div className="sidebar_right">
              <Card>
                <Card.Body>
                  <CurrentUserProfile />
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDash;
