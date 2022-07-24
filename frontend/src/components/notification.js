import React, { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  notificationRead,
} from "../actions/notificationActions";
import { VscCircleFilled } from "react-icons/vsc";

function Notifications(props) {
  const dispatch = useDispatch();
  const [notifs, setNotifData] = useState([]);
  const [read, setRead] = useState("");

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (read !== "") {
      console.log(read);
      dispatch(notificationRead(read));
    }
  }, [read, dispatch]);

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
          <Offcanvas.Title className="fw-bold">Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="notif-subHeader">
            <small className="me-auto text-muted">{notifs.data ? notifs.data.length  : "No"} new notifications</small>
            <small className="float-end">
              <a href="#">Mark all as read</a>
            </small>
            <hr />
          </div>

          {notifs.data && notifs.data.length !== 0 ? (
            notifs.data
              .map((notif, index) => {
                return (
                  <div key={index}>
                    <Button
                      variant="link"
                      className="notif-button-item"
                      onClick={() => {
                        setRead(notif.id);
                      }}
                    >
                      <small className="text-muted float-end">
                        {notif.statusName === "UNREAD" ? (
                          <VscCircleFilled />
                        ) : (
                          ""
                        )}
                      </small>
                      <div>
                        <small>{notif.details}</small>
                      </div>
                      <small className="text-muted">11 mins ago - Event</small>
                      <hr />
                    </Button>
                  </div>
                );
              })
              .reverse()
          ) : (
            <Offcanvas.Body>No new notifications for now</Offcanvas.Body>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Notifications;
