import { io } from "socket.io-client";
import { getNotifications } from "../../services/actions/notificationActions";

export const connection = () => {
  const socket = io(process.env.REACT_APP_SOCKET_CLIENT);
  return socket;
};

export const receiver = (dispatch) => {
  const ws = connection();
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
