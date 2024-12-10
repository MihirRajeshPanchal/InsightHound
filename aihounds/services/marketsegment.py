from aihounds.constants.marketsegment import MARKETSEGMENT_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.marketsegment import MarketSegmentSchema
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool


@tool
def generate_segmentation(vision, mission, description, domain):
    """
    Generates market segments or total addressable market.

    Args:
        vision (str): The vision statement to guide the market segmentation.
        mission (str): The mission statement to guide the market segmentation.
        description (str): A brief description of the project or context.
        domain (str): The domain or industry relevant to the market segmentation.

    Returns:
        list[dict]: A list of market segments, where each segment includes details
        such as unit size, urgency, benefit, potential revenue, market share, growth rate,
        competition index, and financial metrics like customer acquisition cost and profit margin.
    """
    chain = (
        MARKETSEGMENT_PROMPT
        | openai_llm
        | OutputFixingParser.from_llm(
            parser=JsonOutputParser(pydantic_object=MarketSegmentSchema), llm=openai_llm
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

    segments = result.get("segments", [])
    return segments
