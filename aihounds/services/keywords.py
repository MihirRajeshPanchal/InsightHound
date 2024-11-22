from aihounds.constants.keywords import KEYWORD_PROMPT
from aihounds.constants.keywords import openai_llm
from aihounds.models.keywords import KeywordsResponse
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser


def generate_keywords(vision, mission, description, domain):
    chain = KEYWORD_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=KeywordsResponse), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain})
    print(result)
    
    keywords = result.get("keywords", [])
    return keywords