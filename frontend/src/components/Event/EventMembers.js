import React, { useState, useEffect } from "react";
import { Row, Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getEventMembers, memberStatus } from "../../actions/eventActions";
import Loading from "../SiteElements/Loading";
import MemberStatus from "./MemberStatus";

function EventMembers(props) {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [load, setLoad] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (modalShow) {
      console.log(props.eventId);

      dispatch(getEventMembers(props.eventId, setMembers));
    }
  }, [modalShow]);

  return (
    <div className="mb-4">
      <Button onClick={() => setModalShow(true)}>Members</Button>

      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            All members
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form> */}
            <Container className="new-post-container p-3">
              <Row>
                {members.map((member) => (
                  <div key={member.id}>
                    <p>User Id: {member.userId}</p>
                    <MemberStatus eventId={props.eventId} userId={member.userId}/>

                  </div>
                ))}
              </Row>
            </Container>
          {/* </Form> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventMembers;
