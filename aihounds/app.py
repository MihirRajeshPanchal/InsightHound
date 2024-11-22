from fastapi import FastAPI
from aihounds.endpoints import keywords

app = FastAPI()

app.include_router(keywords.router)

@app.get("/")
def root():
    return {"message": "Welcome to AIHound API"}