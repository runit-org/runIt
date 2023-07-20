import EventMembers from "../eventMembers";
import JoinEvent from "../joinEvent";
import RemoveEvent from "../removeEvent";
import CTAButton from "../../../layouts/ctaButton";
import { Edit } from "../../../layouts/icons";
import EventStatus from "../eventStatus";

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
