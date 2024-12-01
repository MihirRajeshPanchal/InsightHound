from aihounds.constants.kanban import KANBAN_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.kanban import KanbanBoard
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser


def generate_kanban(vision, mission, description, domain):
    chain = KANBAN_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=KanbanBoard), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain})
    print(result)
    
    kanban = result.get("tasks", [])
    return kanban