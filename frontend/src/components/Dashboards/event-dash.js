import React, { createContext, useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import EventItem from "../Event/event-item";
import ManageMembers from "../Event/manage-members";
import CommentItem from "../Comments/comment-item";
import CreateComment from "../Comments/create-comment";
import { SearchParam } from "../Utilities/search-param";
import Pagination from "../../layouts/pagination";
import Breadcrumbs from "../../layouts/breadcrumbs";
import { ACCEPTED, CANCELLED, FINISHED, OWNER } from "../Event/utilities/types";
import { SingleEventHandler } from "../Event/utilities/action-handlers";
import { SecurityContext } from "../Context/security-context";
import { BadgeItem } from "../Event/utilities/event-builder";
import { Information } from "../../layouts/icons";
import { InfoCard } from "../../layouts/info-cards";

export const SingleEventContext = createContext();

function EventDash() {
  const params = useParams();
  let pageId = SearchParam();

  const eventData = SingleEventHandler(params, pageId).eventData;
  const commentData = SingleEventHandler(params, pageId).commentData;
  const currentUser = useContext(SecurityContext);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({});
  const { state } = useLocation();

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
                <Container className="content-wrapper">
                  <Breadcrumbs items={breadcrumbItem} />
                  {/* comment item */}
                  {commentData.results ? (
                    commentData.count > 0 ? (
                      commentData.results.map((comment, index) => {
                        return (
                          <div key={index}>
                            <CommentItem
                              commentData={comment}
                              commentCount={commentData.count}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <Card className="comment-item">
                        <Card.Body>
                          <Card.Text>No comments published</Card.Text>
                        </Card.Body>
                      </Card>
                    )
                  ) : (
                    ""
                  )}
                  {/* end of comment item */}
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
                <div className="sidebar_eventDash-wrapper">
                  <Container className="content-wrapper">
                    {eventData.eventStatus === CANCELLED ||
                    eventData.eventStatus === FINISHED ? (
                      <InfoCard
                        title="Note"
                        content={
                          <>
                            This event now has{" "}
                            <BadgeItem eventStatus={eventData.eventStatus} />{" "}
                            therefore it can not be updated or participated in.
                          </>
                        }
                        icon={<Information />}
                        cardStyle={{ backgroundColor: "#eaebfd" }}
                      />
                    ) : (
                      ""
                    )}
                    {/* event item card */}
                    <EventItem commentCount={commentData.count} />
                    {/* publish commnent */}
                    {eventData.joinedStatus === OWNER ||
                    eventData.joinedStatus === ACCEPTED ? (
                      <CreateComment id={params.id} />
                    ) : (
                      <Card className="event-card">
                        <Card.Body>
                          <Card.Text>
                            You will be able collaborate with others via
                            comments once you are accepted.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                    {/* manage members */}
                    {currentUser === eventData.user &&
                    eventData.eventStatus !== CANCELLED &&
                    eventData.eventStatus !== FINISHED ? (
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
