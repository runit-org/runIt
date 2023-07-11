import React from "react";
import { Breadcrumb } from "react-bootstrap";

function Breadcrumbs(props) {
  return (
    <>
      {props.items ? (
        <Breadcrumb className="w-100">
          {props.items.map((item, index) => {
            return (
              <Breadcrumb.Item
                key={index}
                href={item.path}
                active={item.current}
                className="text-truncate"
              >
                {item.title}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      ) : (
        ""
      )}
    </>
  );
}

export default Breadcrumbs;
