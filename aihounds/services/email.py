from aihounds.constants.email import EMAIL_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.email import Email
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool

@tool
def generate_mail(vision, mission, description, domain, array):
    """
    Generates an email subject and template based on the provided inputs.

    This function uses a LangChain pipeline with a custom output parser to 
    process the input data and generate email content.

    Args:
        vision (str): The vision statement to guide the email generation.
        mission (str): The mission statement to guide the email generation.
        description (str): A brief description of the context for the email.
        domain (str): The domain or industry relevant to the email content.
        array (list[str]): Additional inputs or keywords to guide email content.

    Returns:
        tuple[str, str]: A tuple containing the generated email subject and email template.
    """
    chain = EMAIL_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Email), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain, "array": array})
    print(result)
    
    email = result.get("email_template", [])
    subject = result.get("subject", [])
    return Email(subject=subject, email_template=email).model_dump()