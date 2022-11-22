import { io } from "socket.io-client";
import { getNotifications } from "../../actions/notificationActions";

export const connection = () => {
  const socket = io("ws://localhost:5000");

  return socket;
};

export const receiver = (dispatch) => {
  const ws = connection();
  console.log("rec");

  ws.on("data", (arg) => {
    if (arg) {
      if (arg.userToken.includes(localStorage.getItem("username"))) {
        dispatch(getNotifications());
      }
    }
  });
};

export const emitter = (userToken) => {
  const ws = connection();

  ws.emit("client", {
    userToken: userToken,
  });
};
