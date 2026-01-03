const params = new URLSearchParams(window.location.search);

window.GAME_ID = params.get("game");
window.USER_ID = params.get("uid");
window.ROLE = params.get("role"); // draw | viewer
