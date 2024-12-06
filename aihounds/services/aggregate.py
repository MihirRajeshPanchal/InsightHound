from typing import Any, Dict, List
from langchain_core.messages import HumanMessage, ToolMessage, AIMessage
from aihounds.constants.hound import openai_llm, mongo_client
from aihounds.models.aggregate import Message
from aihounds.services.email import generate_email
from aihounds.services.kanban import generate_kanban
from aihounds.services.keywords import generate_keywords
from aihounds.services.marketresearch import generate_questionnaire
from aihounds.services.marketsegment import generate_segments
from aihounds.services.product import generate_product
from aihounds.services.trends import get_trends_search

tools = [generate_email, generate_keywords, generate_product, get_trends_search, generate_questionnaire, generate_kanban, generate_segments]

llm_with_tools = openai_llm.bind_tools(tools)

selected_tool = {
    "generate_email": generate_email, 
    "generate_keywords": generate_keywords, 
    "generate_product": generate_product, 
    "get_trends_search": get_trends_search, 
    "generate_questionnaire": generate_questionnaire, 
    "generate_kanban": generate_kanban, 
    "generate_segments": generate_segments
}

mapping = {
    "generate_email": "mail_init",
    "generate_keywords": "heatmap",
    "generate_product": "product",
    "generate_kanban": "board",
    "generate_segments": "segmentation"
}

def create_tool_call(name: str, id: str, args: Any = None) -> Dict[str, Any]:
    """
    Create a tool call dictionary with the required structure.
    
    Args:
        name (str): Name of the tool
        id (str): Unique identifier for the tool call
        args (Any, optional): Arguments for the tool call. Defaults to None.
    
    Returns:
        Dict[str, Any]: A dictionary representing a tool call
    """
    tool_call = {
        "name": name,
        "id": id,
    }
    if args is not None:
        tool_call["args"] = args
    return tool_call

def do_aggregate(conversation_id: str, query: str) -> List[Dict[str, Any]]:
    '''
    This function is used to aggregate the data from the AI Hounds and store messages.
    
    Args:
        conversation_id (str): Unique identifier for the conversation
        query (str): User's query to be processed
    
    Returns:
        List[Dict[str, Any]]: List of all conversations for the given conversation ID
    '''
    
    past_conversations = list(mongo_client.find("conversations", {"id": conversation_id}))

    messages = []
    for conversation in past_conversations:
        try:
            if conversation['role'] == "user":
                messages.append(HumanMessage(content=conversation['query']))
            elif conversation['role'] == "ai":
                if conversation.get('tool_call_id'):
                    try:
                        tool_name = next(
                            name for name, action in mapping.items() 
                            if action == conversation.get('action', '')
                        )
                    except StopIteration:
                        tool_name = conversation.get('action', 'unknown')
                    
                    tool_calls = [
                        create_tool_call(
                            name=tool_name, 
                            id=conversation['tool_call_id']
                        )
                    ]
                    ai_msg = AIMessage(
                        content=conversation.get('data', ''),
                        tool_calls=tool_calls
                    )
                    messages.append(ai_msg)
                else:
                    messages.append(AIMessage(content=conversation.get('data', '')))
        except Exception as e:
            print(f"Error processing conversation: {conversation}")
            print(f"Error details: {e}")
    
    user_query = HumanMessage(content=query)
    messages.append(user_query)
    
    user_query_record = Message(
        id=conversation_id, 
        role="user", 
        action="query", 
        query=query
    )
    mongo_client.create("conversations", user_query_record)
    
    try:
        ai_msg = llm_with_tools.invoke(messages)
    except Exception as e:
        print(f"LLM invocation error: {e}")
        raise

    messages.append(ai_msg)

    processed_tools = set()

    if ai_msg.tool_calls:
        for tool_call in ai_msg.tool_calls:
            tool_name = tool_call["name"].lower()
            tool_args = tool_call.get("args", {})
            
            if isinstance(tool_args, list):
                tool_args = tool_args[0] if tool_args else {}
            
            try:
                tool_output = selected_tool[tool_name].invoke(tool_args)

                tool_msg = ToolMessage(
                    content=str(tool_output), 
                    tool_call_id=tool_call["id"]
                )
                messages.append(tool_msg)

                # Only create a database entry if this tool hasn't been processed before
                if tool_name not in processed_tools:
                    agent_response = Message(
                        id=conversation_id, 
                        role="ai", 
                        action=mapping.get(tool_name, "query"), 
                        data=str(tool_output), 
                        tool_call_id=tool_call["id"]
                    )
                    mongo_client.create("conversations", agent_response)
                    processed_tools.add(tool_name)
            except Exception as e:
                print(f"Error invoking tool {tool_name}: {e}")
                
    else:
        agent_response = Message(
            id=conversation_id, 
            role="ai", 
            action="query", 
            data=str(ai_msg.content)
        )
        mongo_client.create("conversations", agent_response)
    
    all_conversations = list(mongo_client.find("conversations", {"id": conversation_id}))
    return all_conversations