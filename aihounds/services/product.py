from aihounds.constants.product import PRODUCT_TEMPLATE
from aihounds.constants.hound import openai_llm
from aihounds.models.product import Product
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool

@tool
def generate_product(company, product):
    """
    Generates detailed product information based on the provided company and product name.

    This function uses a LangChain pipeline with a custom output parser to process
    the input data and return structured product details, including product features,
    pricing, and reviews.

    Args:
        company (str): The name of the company offering the product.
        product (str): The name of the product for which information is to be generated.

    Returns:
        dict: A dictionary containing product details, including the company name, 
        product name, pricing, features, and reviews. Each review includes the reviewer's 
        rating and comment, if available.
    """
    chain = PRODUCT_TEMPLATE | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Product), llm=openai_llm)
    
    result = chain.invoke({"company": company, "product": product})
    
    return result