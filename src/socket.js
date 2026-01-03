const socket = io();

socket.emit("join", {
  gameId: GAME_ID,
  uid: USER_ID,
  role: ROLE
});

socket.on("sync", strokes => {
  strokes.forEach(drawFromData);
});

socket.on("draw", drawFromData);

socket.on("clear", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
