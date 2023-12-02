// class WebSockets {
//   users = [];
//   connection(client) {
//     console.log(this.users);
//     // event fired when the chat room is disconnected
//     // client.on("disconnect", () => {
//     //   this.users = this.users.filter((user) => user.socketId !== client.id);
//     // });
//     // add identity of user mapped to the socket id
//     client.on("identity", (userId) => {
//       console.log(userId)
//       this.users.push({
//         socketId: client.id,
//         userId: userId,
//       })
//     });
//     // subscribe person to chat & other user as well
//     // client.on("subscribe", (room, otherUserId = "") => {
//     //   this.subscribeOtherUser(room, otherUserId);
//     //   client.join(room);
//     // });
//     // client.on("unsubscribe", (room) => {
//     //   client.leave(room);
//     // });
//   }

//   subscribeOtherUser(room, otherUserId) {
//     const userSockets = this.users.filter(
//       (user) => user.userId === otherUserId
//     );
//     userSockets.map((userInfo) => {
//       const socketConn = global.io.sockets.connected(userInfo.socketId);
//       if (socketConn) {
//         socketConn.join(room);
//       }
//     });
//   }
// }

// console.log(WebSockets.#users);

// function WebSockets(client) {
//   const users = [];
//     console.log('User connected', client.id)
//     console.log(users);
//     // event fired when the chat room is disconnected
//     // client.on("disconnect", () => {
//     //   this.users = this.users.filter((user) => user.socketId !== client.id);
//     // });
//     // add identity of user mapped to the socket id
//     client.on("identity", (userId) => {
//       console.log(userId)
//       users.push({
//         socketId: client.id,
//         userId: userId,
//       })
//     });
//     // subscribe person to chat & other user as well
//     client.on("subscribe", (room, otherUserId = "") => {
//       this.subscribeOtherUser(room, otherUserId);
//       client.join(room);
//     });
//     client.on("unsubscribe", (room) => {
//       client.leave(room);
//     });
//   }

  // subscribeOtherUser(room, otherUserId) {
  //   const userSockets = this.users.filter(
  //     (user) => user.userId === otherUserId
  //   );
  //   userSockets.map((userInfo) => {
  //     const socketConn = global.io.sockets.connected(userInfo.socketId);
  //     if (socketConn) {
  //       socketConn.join(room);
  //     }
  //   });
  // }
// }

// export default new WebSockets();
// export default WebSockets;
