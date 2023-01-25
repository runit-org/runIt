import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Geomark } from "../SiteElements/icons";
import { EventSuggestHandler } from "./utilities/suggest-handler";

function SuggestItem(props) {
  const [data, setData] = useState("");
  const suggestData = EventSuggestHandler(1);

  useEffect(() => {
    if (props.userData && data) {
      props.userData(data);
    }
  }, [data, props]);

  return (
    <>
      <ListGroup as="ol" className="mb-3">
        {suggestData.data
          ? suggestData.data.map((item, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="d-flex justify-content-between align-items-start p-3"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.title}</div>
                    <Geomark />
                    <small>{item.location}</small>
                  </div>
                  <Button onClick={() => setData(item.title)}>Event it</Button>
                  <Badge bg="secondary" pill>
                    {item.category}
                  </Badge>
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </>
  );
}

export default SuggestItem;
