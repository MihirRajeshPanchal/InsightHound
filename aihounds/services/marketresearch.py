from aihounds.constants.marketresearch import MARKETRESEARCH_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.marketresearch import QuestionnaireSchema
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool

@tool
def generate_questionnaire(vision, mission, description, domain):
    """
    Generates a market research questionnaire based on the provided inputs.

    This function uses a LangChain pipeline with a custom output parser to process 
    the input data and generate a list of questions and their respective options.

    Args:
        vision (str): The vision statement to guide the questionnaire creation.
        mission (str): The mission statement to guide the questionnaire creation.
        description (str): A brief description of the project or context.
        domain (str): The domain or industry relevant to the questionnaire.

    Returns:
        list[dict]: A list of questions for the questionnaire, where each question includes 
        the question text and a list of answer options.
    """
    chain = MARKETRESEARCH_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=QuestionnaireSchema), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain})
    print(result)
    
    questionnaire = result.get("questions", [])
    return questionnaire