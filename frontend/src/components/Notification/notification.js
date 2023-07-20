import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  notificationRead,
  notificationRead_all,
} from "../../services/actions/notificationActions";
import { VscCircleFilled } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import CustomOffCanvas from "../../layouts/ customOffCanvas";

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
    <CustomOffCanvas
      notifShow={props.notifShow}
      close={props.close}
      placement="end"
      title="Notifications"
    >
      <div className="notif-subHeader">
        <div className="content">
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
        </div>
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
                  <div className="notif-details-header clearfix">
                    <span className="text-muted float-start">
                      {notif.humanTimeDiffCreatedAt} ago
                    </span>
                    <span className="notif-mark float-end">
                      {notif.statusName === "UNREAD" ? <VscCircleFilled /> : ""}
                    </span>
                  </div>
                  <div className="d-block float-start w-100">
                    <small
                      dangerouslySetInnerHTML={{ __html: notif.details }}
                    />
                    <hr />
                  </div>
                </Button>
              </div>
            );
          })
        : ""}
    </CustomOffCanvas>
  );
}

export default Notifications;
