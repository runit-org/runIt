import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import UpdateEvent from "./updateEvent";
import { eventOptions } from "./helper/eventOptions";
import { Mention } from "../../utilities/utility-service";
import EventMembers from "./eventMembers";
import { RequestBtn, StatusBadge } from "./helper/eventBuilder";
import { SingleEventContext } from "../../pages/singleEventDash";
import { SecurityContext } from "../../context/securityProvider";
import { CANCELLED, FINISHED } from "./helper/eventTypes";
import { DisplayImage } from "../../layouts/user/userDisplayImg";
import CustomDropdown from "../../layouts/customDropdown";
import PopoverItem from "../../layouts/popoverItem";
import { useEditor } from "../../hooks/useEditor";
import { VerifiedRender } from "../../routes/verifiedRender";

function EventItem() {
  const eventData = useContext(SingleEventContext);
  const currentUser = useContext(SecurityContext);
  const { editorMode, handleClick } = useEditor(false);

  return (
    <>
      {editorMode === false ? (
        <Card className="event-card">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <PopoverItem id={"profile-popover"} data={eventData.userName}>
                <DisplayImage
                  image={eventData.gravatarImage}
                  imgClass="userProf-img me-3 cursor-event"
                />
              </PopoverItem>
              <StatusBadge eventData={eventData} />
              <VerifiedRender>
                {currentUser === eventData.user ? (
                  <CustomDropdown>
                    {eventOptions(
                      eventData.id,
                      eventData.title,
                      eventData.user,
                      currentUser,
                      handleClick
                    )
                      .options_owner.slice(
                        eventData.eventStatus === CANCELLED ||
                          eventData.eventStatus === FINISHED
                          ? (0, 2)
                          : ""
                      )
                      .map((i, index) => {
                        return (
                          <div key={index} className="p-1">
                            {i.item}
                          </div>
                        );
                      })}
                  </CustomDropdown>
                ) : (
                  <RequestBtn eventData={eventData} />
                )}
              </VerifiedRender>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="details_textarea">
              <h4>{eventData.title}</h4>
              <span
                className="content_sm1"
                dangerouslySetInnerHTML={{
                  __html: eventData.details
                    ? Mention(eventData.details)
                    : eventData.details,
                }}
              />
            </div>
            <div className="details_textarea">
              <div className="d-flex flex-column gap-1">
                <h6>Details</h6>
                <small className="text-muted">
                  Host:{" "}
                  <a href={`/profile/settings?user=${eventData.userName}`}>
                    @{eventData.userName}
                  </a>
                </small>

                <small className="text-muted">
                  Posted: {eventData.humanTimeDiffCreatedAt} ago
                </small>

                <small className="text-muted">
                  Date: {eventData.eventDateString}{" "}
                </small>

                <small className="text-muted">
                  Audience Size: {eventData.maxMember}{" "}
                </small>
              </div>

              <div className="mt-4">
                <EventMembers />
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <UpdateEvent
          eventId={eventData.id}
          title={eventData.title}
          details={eventData.details}
          maxMembers={eventData.maxMember}
          cardStyle={currentUser === eventData.user ? "editor-card" : ""}
          handleUpate={handleClick}
        />
      )}
    </>
  );
}

export default EventItem;
