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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("server", "hello client");

  socket.on("client", (msg) => {
    io.emit("data", msg);
    console.log("id: " + msg);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
