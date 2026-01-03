const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const {
  createRoom,
  getRoom,
  addViewer,
  addStroke
} = require("./rooms");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// ✅ SERVE PUBLIC WHITEBOARD
app.use(express.static(path.join(__dirname, "../public")));

// ✅ ROOT ROUTE (FIXES Cannot GET /)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 🔐 Create room (Telegram bot will call this)
app.get("/create", (req, res) => {
  const { game, explainer } = req.query;
  if (!game || !explainer) return res.sendStatus(400);

  createRoom(game, explainer);
  res.json({ ok: true });
});

io.on("connection", socket => {
  socket.on("join", ({ gameId, uid, role }) => {
    const room = getRoom(gameId);
    if (!room) return;

    socket.join(gameId);

    if (role === "viewer") {
      addViewer(gameId, uid);
      socket.emit("sync", room.strokes);
    }

    if (role === "draw" && uid === room.explainerId) {
      socket.emit("allowed");
    }
  });

  socket.on("draw", data => {
    const room = getRoom(data.gameId);
    if (!room) return;
    if (data.uid !== room.explainerId) return;

    addStroke(data.gameId, data);
    socket.to(data.gameId).emit("draw", data);
  });

  socket.on("clear", ({ gameId, uid }) => {
    const room = getRoom(gameId);
    if (!room) return;
    if (uid !== room.explainerId) return;

    room.strokes = [];
    io.to(gameId).emit("clear");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("✅ Whiteboard running on http://localhost:" + PORT);
});
