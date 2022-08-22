import EventMembers from "../Event/event-members";
import JoinEvent from "../Event/join-event";
import RemoveEvent from "../Event/remove-event";
import CTAButton from "../SiteElements/cta-button";
import { RiEditLine } from "react-icons/ri";

export const eventOptions = (id, title, count, user, currUser, handleClick) => {
  const options_owner = [
    {
      item: <RemoveEvent eventId={id} eventTitle={title} eventCounts={count} />,
    },
    {
      item: (
        <div>
          <CTAButton
            type={""}
            btnStyle={"postBtn-placements"}
            variant={"primary"}
            onClick={handleClick}
            placeholder={<RiEditLine />}
          />
        </div>
      ),
    },
    {
      item: <EventMembers eventId={id} userId={user} currentUser={currUser} />,
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
