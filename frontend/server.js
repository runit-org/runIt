const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  console.log("a user connected");
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  console.log("removed");
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("server", "hello client");

  socket.on("clientId", (msg) => {
    io.emit("data", onlineUsers);
    console.log("id: " + msg);
    addNewUser(msg, socket.id);
  });

  socket.on("remove", (msg) => {
    removeUser(msg.id);
    console.log(msg);
    socket.disconnect();
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
