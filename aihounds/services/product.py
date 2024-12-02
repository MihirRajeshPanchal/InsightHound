from aihounds.constants.product import PRODUCT_TEMPLATE
from aihounds.constants.hound import openai_llm
from aihounds.models.product import Product
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser


def generate_product(company, product):
    chain = PRODUCT_TEMPLATE | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Product), llm=openai_llm)
    
    result = chain.invoke({"company": company, "product": product})
    
    return result