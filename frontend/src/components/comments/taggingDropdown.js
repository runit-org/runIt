import { Dropdown } from "react-bootstrap";
import { SingleEventContext } from "../../pages/singleEventDash";
import { useContext, useEffect, useState } from "react";
import { Accepted } from "../event/helper/eventBuilder";

function TaggingDropdown({ onCommentChange, formValue }) {
  const { eventMbs } = useContext(SingleEventContext);
  const acceptedMembers = Accepted(eventMbs);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownArray, setDropdownArray] = useState([]);

  //extract the last tag
  const lastword = (value) => {
    if (value) {
      const tags = value.split(" ");
      const lastTag = tags[tags.length - 1];
      return lastTag;
    } else {
      return "";
    }
  };

  // show dropdown if input field has the tag identifier
  useEffect(() => {
    if (lastword(formValue).includes("@")) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [formValue]);

  const handleDropdownItemClick = (item) => {
    var newComment = "";
    if (lastword(formValue).includes("@")) {
      newComment = `${item.username} `;
    } else {
      newComment = `@${item.username} `;
    }

    onCommentChange(newComment);
  };

  useEffect(() => {
    // Regex to find words with @ symbol
    const regex = /@(\w+)/g;
    const mentions = [];
    let match;

    // Extract words with @ symbol from the text using the regex
    while ((match = regex.exec(lastword(formValue))) !== null) {
      let matchValue = match[1];

      // match the words with username in the object
      const matchingUser = acceptedMembers.find((user) =>
        user.username.includes(matchValue)
      );

      if (matchingUser) {
        mentions.push(matchingUser);
      }
    }
    setDropdownArray(mentions);
  }, [formValue]);

  return (
    <Dropdown
      show={showDropdown}
      onToggle={() => setShowDropdown(!showDropdown)}
    >
      <Dropdown.Toggle variant="light" size="sm" id="dropdown-tag">
        @
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {(dropdownArray.length > 0 ? dropdownArray : acceptedMembers).map(
          (item, index) => {
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
          }
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TaggingDropdown;
