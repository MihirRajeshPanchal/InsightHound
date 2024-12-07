from langchain_core.prompts import ChatPromptTemplate

TITLE_PROMPT = ChatPromptTemplate.from_template("""
Analyze the prompt query {query} using this structure:
{{
    "title": "title of conversation",
}}

First Message of Conversation
{query}

Guidelines: 
- The title should be about the topic of the query.
- The title should be concise and informative.
- The title should be relevant to the query.
- The title should be of under 100 characters.
"""
)

