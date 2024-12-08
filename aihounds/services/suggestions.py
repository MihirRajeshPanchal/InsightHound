from aihounds.constants.hound import openai_llm
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from aihounds.constants.suggestions import SUGGESTIONS_PROMPT
from aihounds.models.suggestions import Suggestions



def generate_suggestions(context: str):
    chain = SUGGESTIONS_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Suggestions), llm=openai_llm)
    
    result = chain.invoke({"context": context})
    print(result)
    
    suggestions = result.get("suggestions", [])
    return suggestions