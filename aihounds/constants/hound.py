from aihounds.repository.repository import MongoDBClient
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

openai_llm = ChatOpenAI(temperature=0, model_name="gpt-4o")

DATABASE_NAME = "insight-hound-test"
mongo_client = MongoDBClient(DATABASE_URL , DATABASE_NAME)