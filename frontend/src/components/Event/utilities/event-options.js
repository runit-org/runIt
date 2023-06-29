import EventMembers from "../event-members";
import JoinEvent from "../join-event";
import RemoveEvent from "../remove-event";
import CTAButton from "../../../layouts/cta-button";
import { Edit } from "../../../layouts/icons";
import EventStatus from "../event-status";

export const eventOptions = (id, title, user, currUser, handleClick) => {
  const options_owner = [
    {
      item: (
        <div>
          <CTAButton
            type={""}
            btnStyle={"postBtn-placements"}
            variant={"primary"}
            onClick={handleClick}
            placeholder={
              <div className="d-flex align-items-center">
                <Edit />
                Edit
              </div>
            }
          />
        </div>
      ),
    },
    {
      item: <EventStatus eventId={id} eventTitle={title} />,
    },
    {
      item: <RemoveEvent eventId={id} eventTitle={title} />,
    },

    /* {
      item: <EventMembers eventId={id} userId={user} currentUser={currUser} />,
    }, */
  ];

  const options_user = [
    {
      item: <JoinEvent eventId={id} eventTitle={title} />,
    },
    {
      item: <EventMembers eventId={id} userId={user} currentUser={currUser} />,
    },
  ];

  return { options_owner, options_user };
};
