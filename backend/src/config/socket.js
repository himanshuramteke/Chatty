import { Server } from "socket.io";

let _io = null;
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export function setupSocketIO(server) {
  _io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  _io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all the connected clients
    _io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      _io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

export const getIO = () => {
  if (!_io) throw new Error("Socket.io not initialialized");
  return _io;
};
