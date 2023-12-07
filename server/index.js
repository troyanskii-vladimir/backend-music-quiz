import { createServer } from 'node:http';
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from 'socket.io';
// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import packRouter from "./routes/pack.js";
import questionRouter from "./routes/question.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";
// middlewares
import { decode } from './middlewares/jwt.js'

import QuestionModel from './models/Question.js';
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
app.use("/questions", questionRouter);
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

let rooms = [];

let privateRooms = [];

import { socker } from './utils/index.js';

/** Create HTTP server. */
const server = createServer(app);

/** Create socket connection */
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//   },
// });

// const makeQuestionsForGame = async (packId) => {
//   const questions = await QuestionModel.getQuestionsByPackId(packId);
//   const songs = await questions.map((question) => question.song);
//   const artists = await questions.map((question) => question.artist);

//   return Array.from({ length: 10 }, () => {
//     return {
//       question: questions[Math.floor(Math.random() * questions.length)],
//       wrongSongs: Array.from({ length: 3 }, () => songs[Math.floor(Math.random() * songs.length)]),
//       wrongArtists: Array.from({ length: 3 }, () => artists[Math.floor(Math.random() * artists.length)]),
//     }
//   });
// };

// const roundGameProcess = async (roomId, roundQuestion, roundNumber) => {
//   const dataToSend = {
//     songUrl: roundQuestion.question.audioFileUrl,
//     artists: roundQuestion.wrongArtists.concat([roundQuestion.question.artist]),
//     songs: roundQuestion.wrongSongs.concat([roundQuestion.question.song]),
//     roundNumber,
//   };

//   io.to(roomId).emit('recieve_gameData', dataToSend);
// };

// const mainGameProccess = async (roomId, packId) => {
//   const roundQuestions = await makeQuestionsForGame(packId);

//   let count = 0;

//   const test = setInterval(() => {
//     roundGameProcess(roomId, roundQuestions[count], count);
//     count++;
//   }, 5000)
// };

// class User {
//   constructor(question) {
//     question;
//     this.question = question;
//   }

//   onClose = () => {
//     console.log('test');
//   }
// }

// const user = new User()


// io.on('connection', (client) => {

//   client.on('send_my_answer', (data) => {
//     console.log('Ответ получен', client.id, data);
//   })


//   client.on("disconnect", () => {
//     users = users.filter((user) => user.socketId !== client.id);
//   });

//   client.on("identity", (userId) => {
//     console.log(users)
//     if (userId === null) {
//       return;
//     }
//     users = users.filter((user) => user.userId !== userId);
//     users.push({
//       socketId: client.id,
//       userId: userId,
//     })
//   });

//   client.on('get_onlineUsers', () => {
//     client.emit('recieve_onlineUsers', users)
//   })

//   client.on('create_room', (data) => {
//     const { _id, packImageUrl, packName } = data;

//     rooms.push({
//       roomId: _id,
//       roomName: packName,
//     })

//     mainGameProccess(_id, _id);
//   });

//   client.on('join_room', (roomId) => {
//     // const roomIds = rooms.map((room) => room.roomId);
//     // if (!roomIds.includes(roomId)) {
//     //   return;
//     // }
//     console.log(`Засунули тебя в команту ${roomId}`)

//     client.join(roomId);
//   })

//   client.on("subscribe", (room, otherUserId = "") => {
//     this.subscribeOtherUser(room, otherUserId);
//     client.join(room);
//   });

//   client.on("unsubscribe", (room) => {
//     client.leave(room);
//   });
// });

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

