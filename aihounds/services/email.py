from aihounds.constants.email import EMAIL_PROMPT
from aihounds.constants.hound import openai_llm
from aihounds.models.email import Email
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser


def generate_email(vision, mission, description, domain, array):
    chain = EMAIL_PROMPT | openai_llm | OutputFixingParser.from_llm(parser=JsonOutputParser(pydantic_object=Email), llm=openai_llm)
    
    result = chain.invoke({"vision": vision, "mission": mission, "description": description, "domain": domain, "array": array})
    print(result)
    
    email = result.get("email_template", [])
    subject = result.get("subject", [])
    return subject, email