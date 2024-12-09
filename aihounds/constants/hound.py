from aihounds.repository.repository import MongoDBClient
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")
SERPAPI_KEY = os.getenv("SERPAPI_KEY")
TYPEFORM_API_TOKEN = os.getenv("TYPEFORM_API_TOKEN")
TYPEFORM_API_URL = "https://api.typeform.com/forms"
NEWS_API_KEY = os.getenv("NEWSAPI")
WORKSPACE_ID = os.getenv("WORKSPACE_ID")
DATABASE_NAME = os.getenv("DATABASE_NAME")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
BASE_URL = "https://newsapi.org/v2/everything"

openai_llm = ChatOpenAI(temperature=0, model_name="gpt-4o")

mongo_client = MongoDBClient(DATABASE_URL, DATABASE_NAME)
