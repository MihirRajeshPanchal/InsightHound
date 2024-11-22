from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from aihounds.endpoints import keywords, onboard
from aihounds.endpoints.crunchbase import crunchbase_router 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(keywords.router)
app.include_router(onboard.router)
app.include_router(crunchbase_router)

@app.get("/")
def root():
    return {"message": "Welcome to AIHound API"}