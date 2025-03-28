import { Server } from "socket.io";
import { _env } from "./constants.js";

export default function realTime(server) {
  const io = new Server(server, {
    cors: {
      origin: _env.ORIGIN.split(","),
      credentials: true,
    },
  });

  const emailToId = new Map();
  const idToEmail = new Map();

  io.on("connection", (socket) => {
    let room;
    socket.on("join:room", ({ roomId, email }) => {
      emailToId.set(email, socket.id);
      idToEmail.set(socket.id, email);
      room = roomId;
      socket.join(roomId);
    });
    socket.on("user:call", ({ to, offer, userInfo }) => {
      socket.to(to).emit("incoming:call", { from: to, offer, userInfo });
    });
    socket.on("ans:accepted", ({ to, ans, userInfo }) => {
      socket.to(to).emit("call:accepted", { ans, userInfo });
    });
    socket.on("user:leave", ({ to, email }) => {
      socket.to(to).emit("peer:reset", { to, email });
    });
    socket.on("ice:candidate", (data) => {
      socket.to(data.to).emit("ice:candidate:receive", data);
    });

    socket.on("room:emoji:fire", ({ to, sender, emoji }) => {
      io.to(to).emit("room:emoji:listen", { sender, emoji });
    });

    socket.on("send:message", ({ to, info }) => {
      io.to(to).emit("receive:message", { info });
    });

    socket.on("disconnect", () => {
      emailToId.delete(idToEmail.get(socket.id));
      idToEmail.delete(socket.id);
    });
  });
}
