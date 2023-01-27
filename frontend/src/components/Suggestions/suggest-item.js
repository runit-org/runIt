import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Information } from "../SiteElements/icons";
import PopoverItem from "./popover-item";
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
      <ListGroup as="ol" className="mb-3 suggested">
        <div className="ps-1">
          <p className="fw-bold m-0">Suggestions</p>
        </div>
        {suggestData.suggestData.data
          ? suggestData.suggestData.data.map((item, index) => {
              return (
                <ListGroup.Item key={index} as="li" className="p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="me-auto">
                      <div className="fw-bold">{item.title}</div>
                    </div>

                    <Badge bg="secondary" pill>
                      {item.category}
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <img
                      src={item.image}
                      alt="suggested-event-img"
                      width="100%"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-start mt-4">
                    <PopoverItem
                      content={{
                        location: item.location,
                        timeStamp: item.time,
                        link: item.link,
                      }}
                      icon={<Information />}
                    />

                    <Button
                      className="d-block"
                      onClick={() => setData(item)}
                      size="sm"
                    >
                      Event it
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })
          : suggestData.isLoading
          ? "Loading"
          : ""}
      </ListGroup>
    </>
  );
}

export default SuggestItem;