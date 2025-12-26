from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://cheatx:cheatmkc@cheatx.unfp4tx.mongodb.net/?appName=cheatx"

mongo = AsyncIOMotorClient(MONGO_URL)

# WAIFU DB
waifu_db = mongo["Character_catcher"]
user_collection = waifu_db["user_collection_lmaoooo"]
characters_collection = waifu_db["anime_characters_lol"]
market_collection = waifu_db["market"]
user_totals = waifu_db["user_totals_lmaoooo"]

# HUSBANDO DB
husbando_db = mongo["husbando_catcher"]
husbando_users = husbando_db["husbando_user_collection"]
husbando_chars = husbando_db["husbando_characters"]
husbando_market = husbando_db["husbando_market"]
husbando_totals = husbando_db["husbando_user_totals"]
