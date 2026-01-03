const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let tool = "pen";

document.getElementById("pen").onclick = () => tool = "pen";
document.getElementById("eraser").onclick = () => tool = "eraser";
document.getElementById("clear").onclick = () => {
  if (ROLE === "draw") socket.emit("clear", { gameId: GAME_ID, uid: USER_ID });
};

if (ROLE !== "draw") {
  canvas.style.pointerEvents = "none";
}

canvas.onmousedown = e => {
  if (ROLE !== "draw") return;
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
};

canvas.onmousemove = e => {
  if (!drawing || ROLE !== "draw") return;

  ctx.lineWidth = tool === "eraser" ? 20 : 3;
  ctx.strokeStyle = tool === "eraser" ? "#111" : "#fff";
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();

  socket.emit("draw", {
    gameId: GAME_ID,
    uid: USER_ID,
    x: e.clientX,
    y: e.clientY,
    tool
  });
};

canvas.onmouseup = () => drawing = false;

function drawFromData(data) {
  ctx.lineWidth = data.tool === "eraser" ? 20 : 3;
  ctx.strokeStyle = data.tool === "eraser" ? "#111" : "#fff";
  ctx.lineTo(data.x, data.y);
  ctx.stroke();
}
