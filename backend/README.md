# Backend for Romanenko UChit

Run locally:

```bash
source backend/bin/activate
export TG_BOT_TOKEN="<paste-token-here>"
export TG_CHAT_ID="<your-chat-or-channel-id>"
uvicorn app.main:app --reload --port 8000
```
