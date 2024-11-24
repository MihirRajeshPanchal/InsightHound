from langchain_core.prompts import ChatPromptTemplate

EMAIL_PROMPT = ChatPromptTemplate.from_template("""
Analyze the following vision, mission, description, domain of the startup and create a email template for mailing to customers using this structure:
{{
    "subject": "subject of the email",
    "email_template": email_template in form of string
}}

Vision content:
{vision}

Mission content:
{mission}

Description content:
{description}

Domain content:
{domain}

ArrayItems = {array}
Guidelines:
- for values in array include them as ${{ArrayItems[0]}}, ${{ArrayItems[1]}} etc. in the email template.
- Dont write ArrayItems[0] directly in the email template. Write the array items in the email template.
- Apart from the array items, no placeholders should be used in the email template.
- Dont add any other placeholder like your company name etc. in the email template.
- Generate email template which is engaging and informative.
- Generate email template which would be sent to customers to inform them about the startup.
- Email template should be in string format.
- Email template should include all the details of the startup.
- Make the email short and informative.
- Generate email subject which is engaging and informative.
"""
)

