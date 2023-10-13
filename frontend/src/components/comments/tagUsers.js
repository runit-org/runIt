import { Dropdown } from "react-bootstrap";
import { SingleEventContext } from "../../pages/singleEventDash";
import { useContext } from "react";
import { Accepted } from "../event/helper/eventBuilder";

function TagUsers({ onCommentChange }) {
  const { eventMbs } = useContext(SingleEventContext);
  const acceptedMembers = Accepted(eventMbs);

  const handleDropdownItemClick = (item) => {
    const newComment = `@${item.username}`;
    onCommentChange(newComment);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" size="sm" id="dropdown-tag">
        @
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {acceptedMembers.map((item, index) => {
          return (
            <Dropdown.Item
              key={index}
              onClick={() => handleDropdownItemClick(item)}
            >
              <div className="d-block">
                <img
                  src={item.gravatarImage}
                  className="members-img me-3"
                  alt="Img"
                />
                {item.username}
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TagUsers;
