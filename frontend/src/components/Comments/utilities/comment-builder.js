import { Like } from "../../SiteElements/icons";

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
      <Like likeStatus={props.commentData.likeStatus} />
      {status}
    </span>
  );
};
