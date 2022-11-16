import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getSingleEvent } from "../../actions/eventActions";
import EventItem from "../Event/event-item";
import ManageMembers from "../Event/manage-members";
import CommentItem from "../Comments/comment-item";
import CreateComment from "../Comments/create-comment";
import { getAllComments } from "../../actions/commentActions";
import { SearchParam } from "../Utilities/search-param";
import Pagination from "../SiteElements/pagination";
import Breadcrumbs from "../SiteElements/breadcrumbs";

function EventDash() {
  const dispatch = useDispatch();
  const params = useParams();
  const [eventData, setEventData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams({});
  const { state } = useLocation();

  let pageId = SearchParam();
  let img = "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );

  useEffect(() => {
    if (getCurrentUser != null) {
      setCurrentUser(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  useEffect(() => {
    dispatch(getSingleEvent(params.id));
    dispatch(getAllComments(params.id, pageId ? pageId : 1));
  }, [dispatch, params.id, pageId]);

  var event = useSelector((securityReducer) => securityReducer.events.events);
  var comments = useSelector(
    (commentReducer) => commentReducer.comments.events
  );

  useEffect(() => {
    if (event) {
      setEventData(event.data);
    }
    if (comments) {
      setCommentData(comments);
    }
  }, [event, comments]);

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
      {eventData ? (
        <div style={{ position: "relative" }}>
          <div className="dash-container">
            <div className="content">
              <Container>
                <Breadcrumbs items={breadcrumbItem} />
                <CreateComment id={params.id} />
                {commentData.results
                  ? commentData.results.map((comment, index) => {
                      return (
                        <div key={index}>
                          <CommentItem
                            eventData={eventData}
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
                  <EventItem
                    eventData={eventData}
                    commentData={commentData}
                    commentCount={commentData.count}
                  />
                  <ManageMembers
                    eventData={eventData}
                    currentUser={currentUser}
                    img={img}
                  />
                </Container>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default EventDash;
