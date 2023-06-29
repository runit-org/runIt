import React, { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  notificationRead,
  notificationRead_all,
} from "../../actions/notificationActions";
import { VscCircleFilled } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function Notifications(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [read, setRead] = useState({});

  useEffect(() => {
    if (read.read) {
      dispatch(notificationRead(read.read)).then(() => {
        if (read.link) {
          navigate(read.link);
        }
      });
    }
  }, [read, navigate, dispatch]);

  const handleReadall = () => {
    dispatch(notificationRead_all());
  };

  return (
    <div>
      <Offcanvas show={props.notifShow} placement={"end"} onHide={props.close}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="notif-subHeader">
            <small className="me-auto text-muted">
              {props.notifs.filter((notif) => notif.statusName === "UNREAD")
                .length > 0
                ? props.notifs.filter((notif) => notif.statusName === "UNREAD")
                    .length
                : "No"}{" "}
              new notifications
            </small>
            <small className="float-end">
              <Button
                size="sm"
                variant="link p-0"
                onClick={() => {
                  handleReadall();
                }}
              >
                Mark all as read
              </Button>
            </small>
            <hr />
          </div>

          {props.notifs && props.notifs.length > 0
            ? props.notifs.map((notif, index) => {
                return (
                  <div key={index}>
                    <Button
                      variant="link"
                      className="notif-button-item"
                      onClick={() => {
                        setRead({ read: notif.id, link: notif.link });
                      }}
                    >
                      <small className="notif-mark float-end">
                        {notif.statusName === "UNREAD" ? (
                          <VscCircleFilled />
                        ) : (
                          ""
                        )}
                      </small>
                      <div>
                        <small
                          dangerouslySetInnerHTML={{ __html: notif.details }}
                        />
                      </div>

                      <small className="text-muted">
                        {notif.humanTimeDiffCreatedAt} ago
                      </small>
                      <hr />
                    </Button>
                  </div>
                );
              })
            : ""}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Notifications;
