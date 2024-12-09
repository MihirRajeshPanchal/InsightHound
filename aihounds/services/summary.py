from aihounds.constants.hound import openai_llm
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from aihounds.constants.summary import SUMMARY_PROMPT
from aihounds.models.summary import SummaryGenerationResponse

def generate_summary(context):

    chain = SUMMARY_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=SummaryGenerationResponse), llm=openai_llm)
    
    result = chain.invoke({"context": context})
    print(result)
    
    summary = result.get("summary", [])
    return summary