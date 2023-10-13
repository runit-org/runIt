import React from "react";
import PopoverItem from "../../layouts/popoverItem";

const SuggestPopover = (props) => {
  return (
    <PopoverItem
      id={"popover-basic"}
      popoverBody={
        <>
          <div className="p-2">
            <span className="fw-bold">Location: </span>
            <span>{props.content.location}</span>
          </div>
          <div className="p-2">
            <span className="fw-bold">Date: </span>
            <span>
              {new Date(props.content.timeStamp).toLocaleDateString()}
            </span>
          </div>
          <div className="p-2">
            <span className="fw-bold">Time: </span>
            <span>
              {new Date(props.content.timeStamp).toLocaleTimeString("en-US", {
                timeStyle: "short",
                hour12: true,
              })}
            </span>
          </div>
          <div className="p-2">
            <a href={props.content.link} rel="noreferrer" target="_blank">
              More Information
            </a>
          </div>
        </>
      }
      childrenClass={"username_tags align-self-center"}
    >
      {props.icon}
    </PopoverItem>
  );
};

export default SuggestPopover;
