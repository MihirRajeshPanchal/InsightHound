from aihounds.constants.product import PRODUCT_TEMPLATE
from aihounds.constants.hound import openai_llm
from aihounds.models.product import Product
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool

@tool
def generate_product(company, product):
    """
    Generate a rival product comparison dataset based on a given company and product.

    This function uses a predefined template to analyze the given company name and product name.
    It then generates a JSON structure that includes product information for the specified product 
    and three rival products. Each product object includes pricing, key features, and sample reviews.

    Parameters:
        company (str): The name of the company for which the product analysis is to be performed.
        product (str): The name of the product for which rival comparisons are to be generated.

    Returns:
        dict: A JSON-like dictionary containing product comparison data for the input company product 
              and three rival products. The structure follows this format:
    """
    chain = PRODUCT_TEMPLATE | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Product), llm=openai_llm)
    
    result = chain.invoke({"company": company, "product": product})
    
    return result