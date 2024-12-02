from aihounds.constants.report import REPORT_TEMPLATE
from aihounds.constants.hound import openai_llm
from aihounds.models.report import HTMLReport
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser


def generate_pdf(company_details, product_comparison, market_segment, market_research, kanban_board):
    chain = REPORT_TEMPLATE | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=HTMLReport), llm=openai_llm)
    
    result = chain.invoke({"company_details": company_details, "product_comparison": product_comparison, "market_segment": market_segment, "market_research": market_research, "kanban_board": kanban_board})
    
    return result