from aihounds.constants.onboard import ONBOARD_PROMPT, text_splitter
from aihounds.constants.hound import openai_llm
from aihounds.models.company import Company
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from fastapi import UploadFile
from langchain_community.document_loaders import PyPDFLoader
import os

async def generate_onboard_schema(file: UploadFile):
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as temp_file:
        content = await file.read()
        temp_file.write(content)

    loader = PyPDFLoader(temp_file_path)
    pages = loader.load()
    
    text = " ".join([page.page_content for page in pages])
    chunks = text_splitter.split_text(text)
    
    chain = ONBOARD_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Company), llm=openai_llm)
    
    result = chain.invoke({"text": chunks})
    
    print(result)
    os.remove(f"temp_{file.filename}")
    return result