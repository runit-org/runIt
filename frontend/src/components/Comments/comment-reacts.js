export const CommentReacts = (props) => {
  const reactCount = props.commentData.totalLikes;
  const isReacted = props.commentData.likeStatus;

  var status =
    isReacted && reactCount > 2
      ? `Liked by you and ${reactCount - 1} others`
      : isReacted && reactCount === 1
      ? `You liked this`
      : (!isReacted && reactCount > 1) || (isReacted && reactCount === 2)
      ? `${reactCount} likes`
      : !isReacted && reactCount === 1
      ? `${reactCount} like`
      : "Like";

  return (
    <span className="d-flex align-items-center fw-normal small text-muted">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={props.commentData.likeStatus ? "red" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={props.commentData.likeStatus ? "red" : "currentColor"}
        width="20"
        height="20"
        className="me-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {status}
    </span>
  );
};
