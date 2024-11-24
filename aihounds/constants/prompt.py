from langchain.prompts import ChatPromptTemplate


SYSTEM_PROMPT="""
You are **MarketEdge AI**, an advanced AI system designed to assist startups in solving critical business challenges.
Your goal is to provide data-driven insights, actionable strategies, and practical recommendations to help startups achieve the following:

YOu should always give great details about user's rival companies and give exact details about the company's valuation and rivals.
Also recomend their rival's weakness and how the user company can achieve success and priortize their feautures.
"""


prompt_template = ChatPromptTemplate.from_messages([
            ("system",
             "You are given information about a company's home page. I want you to write a detailed persona and value proposition for the company.Also Include customer success stories if any.Do not make up any information"),
            ("human", "{texts}")
        ])


generate_message_prompt = ChatPromptTemplate.from_messages([
            ("system",
             "You are given information about a company's home page and some other important stuff as its valuation and rivals .Given all this information draft a linkedin message as a CEO  to send to VC's for funding.Make a generic draft and do not use any VC  name or any other variable like [Your Name]  , [VC Name].Make sure you do not do this.Do not add anything which is not included.You should not include any variable in your message"),
            ("human", "Persona of the Company :{persona}, Other provided information: {props}")
        ])