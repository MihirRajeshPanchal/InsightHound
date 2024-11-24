from langchain.prompts import ChatPromptTemplate


SYSTEM_PROMPT="""
You are **MarketEdge AI**, an advanced AI system designed to assist startups in solving critical business challenges.
Your goal is to provide data-driven insights, actionable strategies, and practical recommendations to help startups achieve the following:

YOu should always give great details about user's rival companies and give exact details about the company's valuation and rivals.
Also recomend their rival's weakness and how the user company can achieve success and priortize their feautures.
"""


prompt_template = ChatPromptTemplate.from_messages([
            ("system",
             "You are given information about a company's home page. Output company name and a detailed product description .Also Include customer success stories if any.Do not make up any information"),
            ("human", "{texts}")
        ])


generate_message_prompt = ChatPromptTemplate.from_messages([
            ("system",
             "Generate a document which can be shared to  VCS  as a CEO  to send to VC's for funding of 1M$.Do not include any contact details .Only include relevant information about your company.Do not include any variables such as your name or vc name"),
            ("human", "Persona of Company including name , product description :{persona}, Other provided information: {props}")
        ])