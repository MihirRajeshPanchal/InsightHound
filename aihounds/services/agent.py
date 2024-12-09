from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.checkpoint.memory import MemorySaver
from typing import Annotated, List, Dict, Any
from dotenv import load_dotenv
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import BaseMessage
from typing_extensions import TypedDict
from aihounds.constants.hound import mongo_client
from langgraph.graph import StateGraph, START
from langgraph.graph.message import add_messages
from langchain_core.tools import tool
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableConfig, chain

load_dotenv()
SYSTEM_PROMPT = """
You are **MarketEdge AI**, an advanced AI system designed to assist startups in solving critical business challenges. Your goal is to provide data-driven insights, actionable strategies, and practical recommendations to help startups achieve the following:

1. Gain competitive advantages in new markets.
2. Achieve and maintain product-market fit (PMF).
3. Optimize resources effectively while scaling.
4. Adapt quickly to market dynamics.
5. Enhance customer understanding and validation.
Use the tools provided to you to help user with their query.
"""


class State(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]
    user_id: str


class LangGraphAgent:
    def __init__(self):
        self.memory = MemorySaver()
        self.tool = TavilySearchResults(max_results=2)
        self.tools = [self.tool]
        self.llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0.7)
        self.llm_with_tools = self.llm.bind_tools(self.tools)
        self.graph_builder = StateGraph(State)
        self._build_graph()
        self.mongoose_client = mongo_client

    def _build_graph(self):
        self.graph_builder.add_node("chatbot", self.chatbot)
        tool_node = ToolNode(tools=self.tools)
        self.graph_builder.add_node("tools", tool_node)
        self.graph_builder.add_conditional_edges("chatbot", tools_condition)
        self.graph_builder.add_edge("tools", "chatbot")
        self.graph_builder.add_edge(START, "chatbot")
        self.graph = self.graph_builder.compile(checkpointer=self.memory)

    def chatbot(self, state: State) -> Dict[str, Any]:
        print("CALLING CHATBOT", State)
        user_data = self.mongoose_client.read("user", state["user_id"])
        company_details = self.mongoose_client.read(
            "company", user_data.get("companyId")
        )
        messages = [
            SystemMessage(SYSTEM_PROMPT),
            *state["messages"],
            f"Company Details About User are: {company_details}. Most Recent messages: {state['messages']}",
        ]
        return {"messages": [self.llm_with_tools.invoke(messages)]}

    def process_message(
        self, message: str, user_id: str, config: Dict[str, Any] = None
    ) -> Any:
        if config is None:
            config = {"configurable": {"thread_id": "1"}}
        events = self.graph.invoke(
            {"messages": [("user", message)], "user_id": user_id},
            config,
            stream_mode="values",
        )
        return events["messages"][-1].content


@tool
def tavily_tool(query: str) -> str:
    """
    You should use this tool when no other tools are applicable
    This tool uses the Tavily Search API to get search results for a query.
    Use this tool every time you need to get search results for a query.
    This will provide you with additional information about the query.
    
    Args:
        query (str): The search query string.

    Returns:
        str: A properly formatted markdown string with the search results.
    """
    try:
        tavily_search = TavilySearchResults(
            max_results=10,
            include_answer=True,
            include_raw_content=True,
            include_images=True,
            
        )
        query=tavily_search.run(query)
        print("Tavily Tool: Invoking LLM with tools...",query)
        llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0.7)

        llm_with_tools = llm.bind_tools([tavily_search])

        message = ChatPromptTemplate(
            [
                (
                    "system",
                    f"You are houndbot who helps startup to generate insights.This is the web data given to you. Please generate a markdown response for it. PLease be as comprehensive as possible.If teh data doesnt make sense ask the user rephrase the query and tell that you do not know",
                ),
                ("human", "{query}"),
            ]
        )
        input_={"query":query}
        chain = message | llm_with_tools
    
        print("Tavily Tool: Invoking LLM with tools...")
        data = chain.invoke({"query": query})
        print("Response:", data)
        print("Tavily Tool: LLM invocation complete.")
        return {"data":data.content}
    except Exception as e:
        print(f"Error invoking 1  Tavily Tool: {e}")
