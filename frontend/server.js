require("dotenv-extended").load();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_SERVER,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("client", (msg) => {
    io.emit("data", msg);
    console.log("id: " + msg);
  });
});

server.listen(4001, () => {
  console.log("listening on *:4001");
});
