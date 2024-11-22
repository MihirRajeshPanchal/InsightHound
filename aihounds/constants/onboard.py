from langchain_core.prompts import ChatPromptTemplate
from langchain.text_splitter import CharacterTextSplitter

ONBOARD_PROMPT = ChatPromptTemplate.from_template("""
Analyze the following vision, mission, description, domain of the startup and create a JSON-format company object using this structure:
{{
    "name": "Generated Schema",
    "description": "Schema generated from PDF content",
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
"""
)

text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=2000,
    chunk_overlap=200,
    length_function=len
)