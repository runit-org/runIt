import { Dropdown } from "react-bootstrap";
import { SingleEventContext } from "../../pages/singleEventDash";
import { useContext, useEffect, useState } from "react";
import { Accepted } from "../event/helper/eventBuilder";

function TaggingDropdown({ onCommentChange, formValue, identifier }) {
  const { eventMbs } = useContext(SingleEventContext);
  const acceptedMembers = Accepted(eventMbs);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownArray, setDropdownArray] = useState([]);

  //extract the last tag
  const lastWord = (value) => {
    if (!value) return "";
    const tags = value.split(" ");
    const lastTag = tags[tags.length - 1];
    return lastTag;
  };

  // show dropdown if input field has the tag identifier
  useEffect(() => {
    if (lastWord(formValue).includes(identifier)) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleDropdownItemClick = (item) => {
    var newComment = item.username;
    if (lastWord(formValue).includes(identifier)) {
      newComment = `${item.username} `;
    } else {
      newComment = `${identifier}${item.username} `;
    }

    // Check if the content field is already populated
    // Check if the content field is already populated and the last word is a tag
    // If tag then replace the previous value with the tag value
    const updatedContent =
      formValue && !lastWord(formValue).includes(identifier)
        ? `${formValue}${newComment}`
        : formValue && lastWord(formValue).includes(identifier)
        ? `${formValue.replace(lastWord(formValue), identifier)}${newComment}`
        : newComment;

    onCommentChange(updatedContent);
  };

  useEffect(() => {
    // Regex to find words with the identifier symbol
    const regex = new RegExp(`${identifier}(\\w+)`, "g");
    const mentions = [];
    let match;

    // Extract words with identifier symbol from the text using the regex
    while ((match = regex.exec(lastWord(formValue))) !== null) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  return (
    <Dropdown
      show={showDropdown}
      onToggle={() => setShowDropdown(!showDropdown)}
    >
      <Dropdown.Toggle variant="light" size="sm" id="dropdown-tag">
        {identifier}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {acceptedMembers.length > 0 ? (
          (dropdownArray.length > 0 ? dropdownArray : acceptedMembers).map(
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
          )
        ) : (
          <Dropdown.Item>
            <span>No suggestions</span>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TaggingDropdown;
