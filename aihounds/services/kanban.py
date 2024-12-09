from aihounds.constants.kanban import KANBAN_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.kanban import KanbanBoard
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool


@tool
def generate_kanban(vision, mission, description, domain):
    """
    Generates a roadmap or next step or planning board only if asked to.

    Args:
        vision (str): The vision statement to guide the Kanban board generation.
        mission (str): The mission statement to guide the Kanban board generation.
        description (str): A brief description of the project or context.
        domain (str): The domain or industry relevant to the Kanban board content.

    Returns:
        list[dict]: A list of tasks for the Kanban board, where each task contains a status
        and description.
    """
    chain = (
        KANBAN_PROMPT
        | openai_llm
        | OutputFixingParser.from_llm(
            parser=JsonOutputParser(pydantic_object=KanbanBoard), llm=openai_llm
        )
    )

    result = chain.invoke(
        {
            "vision": vision,
            "mission": mission,
            "description": description,
            "domain": domain,
        }
    )
    print(result)

    kanban = result.get("tasks", [])
    return kanban
