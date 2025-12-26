from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Gohoopp.db import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# ---------------- PROFILE ----------------
@app.get("/api/profile/{user_id}")
async def profile(user_id: int):
    user = await users.find_one({"id": user_id}) or {}
    stat = await totals.find_one({"id": user_id}) or {}

    return {
        "name": user.get("first_name", "Player"),
        "username": user.get("username"),
        "balance": user.get("balance", 0),
        "rank": stat.get("rank", "Unranked"),
        "total": stat.get("total_characters", 0)
    }

# ---------------- MYVERSE ----------------
@app.get("/api/myverse/{user_id}")
async def myverse(user_id: int, type: str = "waifu"):
    col = users if type == "waifu" else husbando_users
    data = await col.find_one({"id": user_id}) or {}

    return data.get("characters", [])

# ---------------- SEARCH ----------------
@app.get("/api/search")
async def search(q: str, type: str = "waifu"):
    col = characters if type == "waifu" else husbando_chars

    res = []
    async for c in col.find({"name": {"$regex": q, "$options": "i"}}):
        res.append({
            "name": c["name"],
            "anime": c.get("anime"),
            "image": c.get("image"),
            "rarity": c.get("rarity")
        })
    return res

# ---------------- MARKET ----------------
@app.get("/api/market")
async def market_items(type: str = "waifu"):
    col = market if type == "waifu" else husbando_market

    items = []
    async for i in col.find().limit(50):
        items.append({
            "name": i["name"],
            "anime": i.get("anime"),
            "price": i.get("price"),
            "image": i.get("image")
        })
    return items

# ---------------- RANK ----------------
@app.get("/api/rank/{user_id}")
async def rank(user_id: int):
    stat = await totals.find_one({"id": user_id}) or {}
    return stat
