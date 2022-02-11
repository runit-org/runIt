import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import PostItem from "./PostItem";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../actions/eventActions";

function Posts() {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  var allEventsData = useSelector((eventReducer) => eventReducer.events.data);
  useEffect(() => {
    setEventData(allEventsData);
  }, [allEventsData]);
  console.log(eventData);

  return (
    <div className="content">
      {/* <Row className="row justify-content-center">Event Data</Row> */}
      <Row>
        <Col className="post-cards">
          {eventData.map((event) => (
            <div key={event.id}>
              <PostItem eventTitle={event.title} />
            </div>
          ))}
        </Col>

        <Col sm={3} className="post-cards">
          <Card>
            <Card.Body>
              <Card.Title className="text-muted mb-4">Recent Posts</Card.Title>
              {eventData.map((event) => (
                <div className="mb-3" key={event.id}>
                  <SideNav eventTitle={event.title} />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Posts;
