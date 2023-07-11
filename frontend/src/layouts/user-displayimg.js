export const DisplayImage = (props) => {
  return (
    <img
      src={props.image}
      className={`userProf-img ${props.imgClass}`}
      id={props.id}
      alt="user profile"
    />
  );
};
