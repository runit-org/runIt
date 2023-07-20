import RemoveComment from "../removeComment";
import CTAButton from "../../../layouts/ctaButton";
import { Edit } from "../../../layouts/icons";

export const commentOptions = (commentId, eventId, count, handleClick) => {
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
      item: (
        <RemoveComment
          commentId={commentId}
          eventId={eventId}
          commentCount={count}
        />
      ),
    },
  ];

  return { options_owner };
};
