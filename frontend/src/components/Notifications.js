import React, { useState, useEffect } from "react";
import { Row, Col, Offcanvas, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  notificationRead,
} from "../actions/notificationActions";

function Notifications(props) {
  const dispatch = useDispatch();
  const [notifs, setNotifData] = useState([]);
  // const [showA, setShowA] = useState(true);
  const [readStatus, setReadStatus] = useState("");
  const [read, setRead] = useState("");

  // const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (read !== "") {
      dispatch(notificationRead(read, setReadStatus));
    }
  }, [read]);

  var notifications = useSelector(
    (notificationReducer) => notificationReducer.notifications.notifs
  );
  useEffect(() => {
    setNotifData(notifications);
  }, [notifications]);

  return (
    <div>
      <Offcanvas show={props.notifShow} placement={"end"} onHide={props.close}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-center mx-auto">
            <Row>
              <Col>
                <h6 className="fw-bold">Notifications</h6>
              </Col>
            </Row>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {notifs.data && notifs.data.length !== 0 ? (
            notifs.data.map((notif, index) => {
              return (
                <Toast
                  key={index}
                  show={true}
                  onClick={() => {
                    setRead(notif.id);
                  }}
                  className="notif-Toasts"
                >
                  <Toast.Header>
                    {/* <small className="me-auto">{notif.statusName}</small> */}
                    <small className="me-auto">
                      {" "}
                      {readStatus === "true" ? "Read" : notif.statusName}
                    </small>
                    <small>11 mins ago</small>
                  </Toast.Header>
                  <Toast.Body>{notif.details}!</Toast.Body>
                </Toast>
              );
            })
          ) : (
            <Offcanvas.Body>No new notifications for now</Offcanvas.Body>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Notifications;
