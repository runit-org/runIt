import React, { createContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import EventItem from "../Event/event-item";
import ManageMembers from "../Event/manage-members";
import CommentItem from "../Comments/comment-item";
import CreateComment from "../Comments/create-comment";
import { SearchParam } from "../Utilities/search-param";
import Pagination from "../SiteElements/pagination";
import Breadcrumbs from "../SiteElements/breadcrumbs";
import { ACCEPTED, OWNER } from "../Event/utilities/types";
import { SingleEventHandler } from "../Event/utilities/action-handlers";

export const SingleEventContext = createContext();

function EventDash() {
  const params = useParams();
  let pageId = SearchParam();

  const eventData = SingleEventHandler(params, pageId).eventData;
  const commentData = SingleEventHandler(params, pageId).commentData;
  const [currentUser, setCurrentUser] = useState();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams({});
  const { state } = useLocation();

  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );

  useEffect(() => {
    if (getCurrentUser != null) {
      setCurrentUser(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  //pagination
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

  //breadcrumbs
  const breadcrumbItem = eventData
    ? [
        { title: "Dashboard", path: "/posts", current: false },
        {
          title: eventData.title,
          path: `/event/${eventData.id}`,
          current: true,
        },
      ]
    : "";

  return (
    <>
      <SingleEventContext.Provider value={eventData}>
        {eventData ? (
          <div style={{ position: "relative" }}>
            <div className="dash-container">
              <div className="content">
                <Container>
                  <Breadcrumbs items={breadcrumbItem} />
                  {eventData.joinedStatus === OWNER ||
                  eventData.joinedStatus === ACCEPTED ? (
                    <CreateComment id={params.id} />
                  ) : (
                    <Card className="event-card">
                      <Card.Body>
                        <Card.Text>
                          You will be able collaborate with others via comments
                          once you are accepted.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  )}

                  {commentData.results
                    ? commentData.results.map((comment, index) => {
                        return (
                          <div key={index}>
                            <CommentItem
                              commentData={comment}
                              commentCount={commentData.count}
                            />
                          </div>
                        );
                      })
                    : ""}
                  {commentData.count > 10 ? (
                    <Pagination
                      postsPerPage={postPerPage}
                      totalPosts={commentData.count}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  ) : (
                    ""
                  )}
                </Container>
              </div>

              <div className="sidebar_eventDash">
                <div className="sidebar-wrapper">
                  <Container>
                    <EventItem commentCount={commentData.count} />
                    {currentUser === eventData.user ? (
                      <ManageMembers currentUser={currentUser} />
                    ) : (
                      ""
                    )}
                  </Container>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </SingleEventContext.Provider>
    </>
  );
}

export default EventDash;
