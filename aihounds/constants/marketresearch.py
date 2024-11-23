from langchain_core.prompts import ChatPromptTemplate

MARKETRESEARCH_PROMPT = ChatPromptTemplate.from_template(
    """
Analyze the following vision, mission, description, and domain of the startup to create a JSON-format questionnaire schema using this structure:
{{
    "questions": [
        {{  
            "questionText": "Question text",
            "questionOptions": [
                "Option1",
                "Option2",
                "Option3",
                "Option4"
            ]
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
- Create a questionnaire set regarding the market research of the startup depending upon the vision, mission, and domain of the startup.
- It should be in JSON format as per the structure provided above.
- Questions should be designed to provide deeper insights into the following areas:
  1. Customer needs and preferences related to the startup's offerings.
  2. Market trends and gaps in alignment with the startup's domain.
  3. Perceptions of the startup's vision and mission within the target audience.
  4. Competitive landscape and positioning relative to the startup’s mission.
  5. Feasibility of achieving the startup's goals within the market.
  6. Scalability and potential barriers to expansion.
  7. Value propositions and their relevance to the target market.
  8. Level of awareness and trust in similar offerings.
  9. Innovative aspects and user openness to adopting the startup's solutions.
 10. Feedback on pricing, features, and overall fit of the product/service.
- Each question should be designed to collect data that is actionable and directly relevant to shaping the startup's strategy.
"""
)