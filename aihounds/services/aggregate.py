from datetime import datetime
from typing import Any, Dict, List
from langchain_core.messages import HumanMessage, ToolMessage, AIMessage
from aihounds.constants.hound import openai_llm, mongo_client
from aihounds.models.aggregate import Message
from aihounds.services.email import generate_mail
from aihounds.services.kanban import generate_kanban
from aihounds.services.marketsegment import generate_segmentation
from aihounds.services.news import generate_news
from aihounds.services.outreach import generate_linkedin
from aihounds.services.product import generate_product
from aihounds.services.trends import generate_heatmap
from aihounds.services.typeform import generate_typeform, get_typeform_responses

tools = [generate_news, generate_product,generate_heatmap, generate_mail, generate_linkedin, generate_segmentation, generate_kanban, generate_typeform, get_typeform_responses]

llm_with_tools = openai_llm.bind_tools(tools)

selected_tool = {
    "generate_news": generate_news, # working
    "generate_product": generate_product, # working
    "generate_heatmap": generate_heatmap, # working
    "generate_mail": generate_mail, # working
    "generate_linkedin": generate_linkedin, # working
    "generate_segmentation": generate_segmentation, # working
    "generate_kanban": generate_kanban, # working
    "generate_typeform": generate_typeform,  # working
    "get_typeform_responses": get_typeform_responses  # not working
}

mapping = {
    "generate_news" : "feed", # working
    "generate_product" : "product", # working
    "generate_heatmap" : "heatmap", # working
    "generate_mail" : "mail_init", # working
    "generate_linkedin" : "linkedin", # working
    "generate_segmentation" : "segmentation", # working
    "generate_kanban" : "board", # working
    "generate_typeform" : "questionnaire", # working
    "get_typeform_responses" : "questionnaire_analysis", # not working
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

def do_aggregate(conversation_id: str, query: str, context: str) -> List[Dict[str, Any]]:
    '''
    This function is used to aggregate the data from the AI Hounds and store messages.
    
    Args:
        conversation_id (str): Unique identifier for the conversation
        query (str): User's query to be processed
    
    Returns:
        List[Dict[str, Any]]: List of all conversations for the given conversation ID
    '''
    ai_list_return = []
    temp_query = query
    query = context + query
    previous_conversations = list(mongo_client.find(
        "conversations", 
        {"id": conversation_id}
    ))
    

    context_parts = []
    for conv in previous_conversations:
        if conv.get('role') == 'user':
            context_parts.append(f"User: {conv.get('query', '')}")
        elif conv.get('role') == 'ai':
            context_parts.append(f"AI: {conv.get('data', '')}")
    

    context = "Previous Conversation Context:\n" + "\n".join(context_parts)
    query = context + "\n\nCurrent Query: " + query
    

    last_ai_response = mongo_client.find_one(
        "conversations", 
        {
            "id": conversation_id, 
            "role": "ai"
        }, 
        sort=[("timestamp", -1)]
    )

    messages = []
    
    if last_ai_response and last_ai_response.get('action') == 'response_md_pending':
        if last_ai_response.get('tool_call_id'):
            try:
                tool_name = next(
                    name for name, action in mapping.items() 
                    if action == last_ai_response.get('action', '')
                )
            except StopIteration:
                tool_name = last_ai_response.get('action', 'unknown')
            
            tool_calls = [
                create_tool_call(
                    name=tool_name, 
                    id=last_ai_response['tool_call_id']
                )
            ]
            ai_msg = AIMessage(
                content=last_ai_response.get('data', ''),
                tool_calls=tool_calls
            )
            messages.append(ai_msg)
        else:
            messages.append(AIMessage(content=last_ai_response.get('data', '')))
    
    for conv in previous_conversations:
        if conv.get('role') == 'user':
            messages.append(HumanMessage(content=conv.get('query', '')))
        elif conv.get('role') == 'ai' and not conv.get('tool_call_id'):
            messages.append(AIMessage(content=conv.get('data', '')))
    
    user_query = HumanMessage(content=query)
    messages.append(user_query)
    
    user_query_record = Message(
        conversation_id=conversation_id, 
        role="user", 
        action="query", 
        query=temp_query,
        timestamp=datetime.now()
    )
    mongo_client.create("messages", user_query_record)
    
    try:
        ai_msg = llm_with_tools.invoke(messages)
    except Exception as e:
        print(f"LLM invocation error: {e}")
        raise

    messages.append(ai_msg)

    processed_tools = set()

    print("*****************************************************")
    print(ai_msg.tool_calls)
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

                if tool_name not in processed_tools:
                    agent_response = Message(
                        conversation_id=conversation_id, 
                        role="ai", 
                        action=mapping.get(tool_name, "response_md_pending"), 
                        data=str(tool_output), 
                        tool_call_id=tool_call["id"],
                        timestamp=datetime.now()
                    )
                    mongo_client.create("messages", agent_response)
                    ai_list_return.append(agent_response)
                    processed_tools.add(tool_name)
            except Exception as e:
                print(f"Error invoking tool {tool_name}: {e}")
                
    else:
        agent_response = Message(
            conversation_id=conversation_id, 
            role="ai", 
            action="response_md_pending", 
            data=str(ai_msg.content),
            timestamp=datetime.now()
        )
        ai_list_return.append(agent_response)
        mongo_client.create("messages", agent_response)

    return ai_list_return