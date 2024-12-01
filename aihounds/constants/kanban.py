from langchain_core.prompts import ChatPromptTemplate

KANBAN_PROMPT = ChatPromptTemplate.from_template(
    """
Analyze the following vision, mission, description, and domain of the startup to create a JSON-format questionnaire schema using this structure:
{{
    "tasks": [
        {{  
            "status": "TODO",
            "task": "Task description",
        }}
    ]
}}

Vision content:
{vision}

Mission content:
{mission}

Description content:
{description}

Domain content:
{domain}

Guidelines:
- Create a kanban board based on the tasks provided in the vision, mission, and domain of the startup.
- It should be in JSON format as per the structure provided above.
- Tasks should be designed to align with the startup's goals and objectives.
- Each task should be categorized based on the department or team responsible for its completion.
- The kanban board should provide a clear overview of the startup's progress and priorities.
- Include relevant details such as task descriptions
- Status should be set to "TODO" for all tasks
"""
)