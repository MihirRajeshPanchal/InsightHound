from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import CharacterTextSplitter

ONBOARD_PROMPT = ChatPromptTemplate.from_template("""
Analyze the following vision, mission, description, domain of the startup and create a JSON-format company object using this structure:
{{
    "name": "Name of the starup",
    "description": "Brief description of the startup",
    "vision": "The vision of the startup",
    "mission": "The mission of the startup",
    "valuation": "The valuation of the startup",
    "domain": "The domain of the startup",
}}

Text Content:
{text}

Guidelines:
- Generate a comprehensive company object based on the contents identified in the text.
- Ensure that the company object is structured correctly.
- IF YOU DONT KNOW THE VALUE OF A FIELD, LEAVE IT AS NULL
- Domain can only be "Technology", "Education", "Finance", "Healthcare", "Retail", "Real Estate", "Agriculture", "Manufacturing", "Transportation", "Logistics", "Hospitality", "Entertainment", "Media", "Telecommunications", "Energy", "Utilities", "Construction", "Automotive", "Government", "Non-profit", "Others"
"""
)

text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=2000,
    chunk_overlap=200,
    length_function=len
)