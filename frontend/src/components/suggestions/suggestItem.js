import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Information } from "../../layouts/icons";
import { Skeleton } from "../../layouts/loader";
import PopoverItem from "./popoverItem";
import { EventSuggestHandler } from "./helper/suggestHandler";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { VerifiedRender } from "../../routes/verifiedRender";

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
        <SectionHeader>Suggestions</SectionHeader>
        {suggestData.suggestData.data ? (
          suggestData.suggestData.data.map((item, index) => {
            return (
              <ListGroup.Item key={index} as="li" className="p-3">
                <div className="d-flex justify-content-between gap-1 align-items-start">
                  <div className="me-auto">
                    <span className="fw-bold">{item.title}</span>
                  </div>
                  <PopoverItem
                    content={{
                      location: item.location,
                      timeStamp: item.time,
                      link: item.link,
                    }}
                    icon={<Information />}
                  />
                </div>

                <div className="mt-3">
                  <img
                    src={item.image}
                    alt="suggested-event-img"
                    width="100%"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-start mt-4">
                  <Badge bg="secondary">{item.category}</Badge>
                  <VerifiedRender>
                    <Button
                      className="d-block"
                      onClick={() => setData(item)}
                      size="sm"
                    >
                      Event it
                    </Button>
                  </VerifiedRender>
                </div>
              </ListGroup.Item>
            );
          })
        ) : suggestData.isLoading ? (
          <Skeleton />
        ) : (
          <h6 className="m-1">No suggestions at this moment....</h6>
        )}
      </ListGroup>
    </>
  );
}

export default SuggestItem;
