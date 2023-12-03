import { createServer } from 'node:http';
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from 'socket.io';
// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import packRouter from "./routes/pack.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";
// middlewares
import { decode } from './middlewares/jwt.js'
// mongo connection
import "./config/mongo.js";
// socket configuration
// import WebSockets from "./utils/WebSockets.js";

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || 3000;

app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/auth", userRouter);
app.use("/packs", packRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

let users = [];

/** Create HTTP server. */
const server = createServer(app);


/** Create socket connection */
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  },
});

io.on('connection', (client) => {
  client.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== client.id);
  });

  client.on("identity", (userId) => {
    users.push({
      socketId: client.id,
      userId: userId,
    })
  });

  client.on("subscribe", (room, otherUserId = "") => {
    this.subscribeOtherUser(room, otherUserId);
    client.join(room);
  });

  client.on("unsubscribe", (room) => {
    client.leave(room);
  });
});

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

