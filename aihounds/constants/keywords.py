from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai_llm = ChatOpenAI(temperature=0, model_name="gpt-4o")

KEYWORD_PROMPT = ChatPromptTemplate.from_template("""
Analyze the following vision, mission, description, domain of the startup and create a JSON-format database schema using this structure:
{{
    "keywords": [
        "keyword1",
        "keyword2",
        "keyword3",
    ]
}}

Vision content:
{vision}

Mission content:
{mission}

Description content:
{description}

Domain content:
{domain}

Guidelines:
- `keywords` should be a list of strings.
- Each keyword should be a string.
- Generate keywords which are relevant to the startup details.
- Generate keywords which would be searched by users to find the startup.
"""
)