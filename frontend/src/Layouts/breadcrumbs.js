import React from "react";
import { Breadcrumb } from "react-bootstrap";

function Breadcrumbs(props) {
  return (
    <>
      {props.items ? (
        <Breadcrumb>
          {props.items.map((item, index) => {
            return (
              <Breadcrumb.Item
                key={index}
                href={item.path}
                active={item.current}
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
