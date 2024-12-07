from langchain_core.prompts import ChatPromptTemplate

LINKEDIN_PROMPT = ChatPromptTemplate.from_template("""
Analyze the following vision, mission, description, domain of the startup and create a linkedin template {purpose} using this structure:
{{
    "message": "linkedin message",
}}

Purpose of Linkedin message
{purpose}

Guidelines:
- Generate linkedin template which is engaging and informative.
- linkedin template should be in string format.
- linkedin template should include all the details of the startup.
- Make the linkedin short and informative.
- Generate linkedin subject which is engaging and informative.
"""
)

