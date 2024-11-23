from aihounds.constants.marketresearch import MARKETRESEARCH_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.marketresearch import QuestionnaireSchema
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser


def generate_questionnaire(vision, mission, description, domain):
    chain = MARKETRESEARCH_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=QuestionnaireSchema), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain})
    print(result)
    
    questionnaire = result.get("questions", [])
    return questionnaire