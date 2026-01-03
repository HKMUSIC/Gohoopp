const rooms = new Map();

/*
room = {
  gameId,
  explainerId,
  viewers: [],
  strokes: []
}
*/

function createRoom(gameId, explainerId) {
  rooms.set(gameId, {
    gameId,
    explainerId,
    viewers: [],
    strokes: []
  });
}

function getRoom(gameId) {
  return rooms.get(gameId);
}

function addViewer(gameId, uid) {
  const room = rooms.get(gameId);
  if (room && !room.viewers.includes(uid)) {
    room.viewers.push(uid);
  }
}

function addStroke(gameId, stroke) {
  const room = rooms.get(gameId);
  if (room) room.strokes.push(stroke);
}

module.exports = {
  createRoom,
  getRoom,
  addViewer,
  addStroke
};
