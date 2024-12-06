from aihounds.constants.keywords import KEYWORD_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.keywords import KeywordsResponse
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool

@tool
def generate_keywords(vision, mission, description, domain):
    """
    Generates a list of keywords based on the provided inputs.

    This function uses a LangChain pipeline with a custom output parser to process 
    the input data and extract relevant keywords.

    Args:
        vision (str): The vision statement to guide the keyword generation.
        mission (str): The mission statement to guide the keyword generation.
        description (str): A brief description of the project or context.
        domain (str): The domain or industry relevant to the keyword generation.

    Returns:
        list[str]: A list of keywords relevant to the provided inputs.
    """
    chain = KEYWORD_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=KeywordsResponse), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain})
    print(result)
    
    keywords = result.get("keywords", [])
    return keywords