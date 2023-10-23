import React, { createContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import EventItem from "../components/event/eventItem";
import ManageMembers from "../components/event/manageMembers";
import CommentItem from "../components/comments/commentItem";
import CreateComment from "../components/comments/createComment";
import { usePageId } from "../hooks/usePageId";
import Pagination from "../layouts/pagination";
import Breadcrumbs from "../layouts/breadcrumbs";
import {
  ACCEPTED,
  CANCELLED,
  FINISHED,
  OWNER,
} from "../components/event/helper/eventTypes";
import { SingleEventHandler } from "../components/event/helper/actionHandlers";
import { BadgeItem } from "../components/event/helper/eventBuilder";
import { Information } from "../layouts/icons";
import { InfoCard } from "../layouts/infoCards";
import { VerifiedRender } from "../routes/verifiedRender";
import { EVENT, POSTS } from "../routes/routes";

export const SingleEventContext = createContext();

function SingleEventDash() {
  let pageId = usePageId();
  const { state } = useLocation();
  const { eventData, commentData, eventMbs } = SingleEventHandler(pageId);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({});

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
        { title: "Dashboard", path: `/${POSTS}`, current: false },
        {
          title: eventData.title,
          path: `/${EVENT}/${eventData.id}`,
          current: true,
        },
      ]
    : "";

  // check if user is eligible to comment
  const commentCondition = () => {
    if (!eventData) return null;
    return (
      (eventData.joinedStatus === OWNER ||
        eventData.joinedStatus === ACCEPTED) &&
      eventData.eventStatus !== CANCELLED &&
      eventData.eventStatus !== FINISHED
    );
  };

  // check if user is eligible to accept or reject requests
  const manageUsersCondition = () => {
    if (!eventData) return null;
    return (
      eventData.joinedStatus === OWNER &&
      !eventData.fullStatus &&
      eventData.eventStatus !== CANCELLED &&
      eventData.eventStatus !== FINISHED
    );
  };

  return (
    <SingleEventContext.Provider value={{ eventData, eventMbs }}>
      {eventData && (
        <div style={{ position: "relative" }}>
          <div className="dash-container">
            <div className="content">
              <Container className="content-wrapper">
                <Breadcrumbs items={breadcrumbItem} />
                {/* comment item */}
                {commentData.results && commentData.count > 0 ? (
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
                      <Card.Text>
                        No comments have been published yet.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
                {/* end of comment item */}
                {commentData.count > 10 && (
                  <Pagination
                    postsPerPage={postPerPage}
                    totalPosts={commentData.count}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                )}
              </Container>
            </div>

            <div className="sidebar_eventDash">
              <div className="sidebar_eventDash-wrapper">
                <Container className="content-wrapper">
                  {(eventData.eventStatus === CANCELLED ||
                    eventData.eventStatus === FINISHED) && (
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
                  )}
                  {/* event item card */}
                  <EventItem />
                  {/* publish comment */}
                  <VerifiedRender>
                    {commentCondition() ? (
                      <CreateComment id={eventData.id} />
                    ) : (
                      <Card className="event-card">
                        <Card.Body>
                          <Card.Text>
                            You will be able to collaborate with others via
                            comments once your request is approved.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                    {/* manage members */}
                    {manageUsersCondition() && <ManageMembers />}
                  </VerifiedRender>
                </Container>
              </div>
            </div>
          </div>
        </div>
      )}
    </SingleEventContext.Provider>
  );
}

export default SingleEventDash;
