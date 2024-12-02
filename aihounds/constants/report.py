from langchain_core.prompts import ChatPromptTemplate

REPORT_TEMPLATE = ChatPromptTemplate.from_template("""
Analyze the following vision, mission, description, domain of the startup and create a email template for mailing to customers using this structure:
{{
    "html_content": "html content of the email",
}}

Company Details:
{company_details}

Product Comparison:
{product_comparison}

Market Segment 
{market_segment}

Market Research
{market_research}

Kanban Board - Next Steps
{kanban_board}

Guidelines:
- Generate a report which is engaging and informative.
- Generate HTML in 4 sections: 
    1. Company Details 
    2. Product Comparison 
    3. Market Segment 
    4. Market Research
    5. Kanban Board - Next Steps
- Give me just the body part of html content without styling.
- If any of the data is missing then skip that section.
"""
)

