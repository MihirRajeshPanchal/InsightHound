from aihounds.constants.hound import openai_llm
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from aihounds.constants.insights import INSIGHT_PROMPT
from aihounds.models.insights import Insight


def generate_insight(context: str):
    chain = INSIGHT_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Insight), llm=openai_llm)
    
    result = chain.invoke({"context": context})
    print(result)
    
    insight = result.get("insight", [])
    return insight