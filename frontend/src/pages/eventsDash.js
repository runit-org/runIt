import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CreatePost from "../components/event/createEvent";
import EventItemCard from "../components/event/eventItemCard";
import CurrentUserProfile from "../components/profile/currentUserProfile";
import { EventHandler } from "../components/event/helper/actionHandlers";
import SuggestItem from "../components/suggestions/suggestItem";
import { VerifiedRender } from "../routes/verifiedRender";
import ResendOtp from "../components/userAuth/resendOtp";
import CTAButton from "../layouts/ctaButton";
import { Loading } from "../layouts/loader";
import { ResponseToast } from "../layouts/responseItems";

function MainDash() {
  const { count, hasMore, load, eventData, handleLoadMore } = EventHandler();

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
              <VerifiedRender>
                <CreatePost suggestion={suggestedData} />
              </VerifiedRender>

              <Row xs={1} sm={1} md={1}>
                {count > 0 ? (
                  eventData.map((event, index) => (
                    <Col key={index}>
                      <EventItemCard eventData={event} />
                    </Col>
                  ))
                ) : !load && count === 0 ? (
                  <div>
                    <h1>Nothing yet...</h1>
                  </div>
                ) : (
                  <Col>
                    <Loading />
                  </Col>
                )}
              </Row>
            </div>

            {hasMore && (
              <div className="w-100 d-flex justify-content-center mb-3">
                <CTAButton
                  type={"submit"}
                  btnStyle={"formBtn cta_button d-block mt-2"}
                  variant={"primary"}
                  isLoading={load}
                  onClick={handleLoadMore}
                  placeholder={
                    <div className="d-flex align-items-center justify-content-center">
                      Show more
                    </div>
                  }
                />
              </div>
            )}
          </Container>
        </div>

        <div className="sidebar">
          <div className="sidebar-wrapper ">
            <div className="sidebar_right">
              <ResendOtp />
              <Card>
                <Card.Body>
                  <CurrentUserProfile />
                </Card.Body>
              </Card>
              <ResponseToast />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDash;
