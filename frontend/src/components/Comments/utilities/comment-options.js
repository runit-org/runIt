import RemoveComment from "../remove-comment";
import CTAButton from "../../SiteElements/cta-button";

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  width="20"
                  height="20"
                  className="me-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
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
