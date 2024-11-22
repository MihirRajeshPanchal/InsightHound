from fastapi import FastAPI
from aihounds.endpoints import keywords, onboard

app = FastAPI()

app.include_router(keywords.router)
app.include_router(onboard.router)

@app.get("/")
def root():
    return {"message": "Welcome to AIHound API"}