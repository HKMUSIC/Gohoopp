const API = "https://your-vercel-url.vercel.app/api";
const USER_ID = localStorage.getItem("uid"); // manual login / future auth

async function loadProfile(){
  const r = await fetch(`${API}/profile/${USER_ID}`);
  const d = await r.json();

  name.innerText = d.name;
  username.innerText = d.username ? "@"+d.username : "";
}

async function loadMyverse(type="waifu"){
  const r = await fetch(`${API}/myverse/${USER_ID}?type=${type}`);
  const data = await r.json();

  grid.innerHTML="";
  data.forEach(c=>{
    grid.innerHTML+=`
      <div class="card">
        <img src="${c.image}">
        <h3>${c.name}</h3>
        <p>${c.anime}</p>
      </div>
    `;
  });
}

async function searchChar(q,type){
  const r = await fetch(`${API}/search?q=${q}&type=${type}`);
  const data = await r.json();
  console.log(data);
}
