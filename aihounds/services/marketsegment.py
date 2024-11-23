from aihounds.constants.marketsegment import MARKETSEGMENT_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.marketsegment import MarketSegmentSchema
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser


def generate_segments(vision, mission, description, domain):
    chain = MARKETSEGMENT_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=MarketSegmentSchema), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain})
    print(result)
    
    segments = result.get("segments", [])
    return segments