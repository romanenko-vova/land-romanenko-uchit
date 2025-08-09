from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from telegram import Bot
from dotenv import load_dotenv


app = FastAPI(title="Romanenko UChit API")
load_dotenv()  # подхватываем TG_BOT_TOKEN, TG_CHAT_ID из .env при запуске

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Lead(BaseModel):
    name: str
    phone: str | None = None
    tg: str | None = None
    message: str | None = None

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/lead")
async def create_lead(
    name: str = Form(...),
    phone: str | None = Form(None),
    tg: str | None = Form(None),
    message: str | None = Form(None),
):
    # Telegram уведомление (если заданы токен и chat_id)
    token = os.getenv("TG_BOT_TOKEN")
    chat_id = os.getenv("TG_CHAT_ID")
    if token and chat_id:
        bot = Bot(token=token)
        text = (
            "Новая заявка на romanenko-uchit\n"
            f"Имя: {name}\n"
            f"Телефон: {phone or '-'}\n"
            f"TG: {tg or '-'}\n"
            f"Сообщение: {message or '-'}"
        )
        try:
            await bot.send_message(chat_id=chat_id, text=text)
        except Exception as e:
            print("TG error:", e)
    return {"ok": True}
