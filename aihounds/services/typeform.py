import httpx
from aihounds.constants.hound import TYPEFORM_API_TOKEN, TYPEFORM_API_URL
from aihounds.models.typeform import ResponseFrequency, SurveyRequest
from aihounds.services.marketresearch import generate_questionnaire
from langchain_core.tools import tool

def create_typeform_definition(survey_request: SurveyRequest) -> dict:
    """
    Transform the survey request into Typeform's expected format
    """
    return {
        "title": survey_request.title,
        "theme": {
            "href": "https://api.typeform.com/themes/default"
        },
        "workspace": {
            "href": "https://api.typeform.com/workspaces/QDcqdz"
        },
        "settings": {
            "language": "en",
            "progress_bar": "percentage",
            "show_progress_bar": True,
            "show_typeform_branding": True,  
            "is_public": True
        },
        "fields": [
            {
                "ref": f"question_{index}",
                "title": question["questionText"],
                "type": "multiple_choice",
                "properties": {
                    "choices": [
                        {
                            "label": option,
                            "ref": f"choice_{index}_{opt_index}"
                        }
                        for opt_index, option in enumerate(question.questionOptions)
                    ],
                    "randomize": False,
                    "allow_multiple_selection": False,
                    "allow_other_choice": False,
                    "vertical_alignment": True
                },
                "validations": {
                    "required": True
                }
            }
            for index, question in enumerate(survey_request.questions)
        ]
    } 
    
def create_typeform_aggregate_definition(survey_request: dict) -> dict:
    """
    Transform the survey request into Typeform's expected format
    """
    return {
        "title": survey_request["title"],
        "theme": {
            "href": "https://api.typeform.com/themes/default"
        },
        "workspace": {
            "href": "https://api.typeform.com/workspaces/QDcqdz"
        },
        "settings": {
            "language": "en",
            "progress_bar": "percentage",
            "show_progress_bar": True,
            "show_typeform_branding": True,  
            "is_public": True
        },
        "fields": [
            {
                "ref": f"question_{index}",
                "title": question["questionText"],
                "type": "multiple_choice",
                "properties": {
                    "choices": [
                        {
                            "label": option,
                            "ref": f"choice_{index}_{opt_index}"
                        }
                        for opt_index, option in enumerate(question["questionOptions"])
                    ],
                    "randomize": False,
                    "allow_multiple_selection": False,
                    "allow_other_choice": False,
                    "vertical_alignment": True
                },
                "validations": {
                    "required": True
                }
            }
            for index, question in enumerate(survey_request["questions"])
        ]
    } 

@tool
def generate_typeform(vision, mission, description, domain):
    """
    Generates a Typeform survey based on the provided vision, mission, description, and domain.

    This function dynamically creates a survey request by calling `generate_questionnaire` 
    to construct the survey questions and then sends a POST request to the Typeform API 
    to create the survey.

    Parameters:
        vision (str): The vision statement to help inform the survey content.
        mission (str): The mission statement to guide the focus of the questions.
        description (str): A detailed description of the context or purpose of the survey.
        domain (str): The domain or industry relevant to the survey.

    Returns:
        Union[QuestionnaireSchema, TypeformResponse]: 
            - `QuestionnaireSchema`: Contains the list of survey questions.
            - `TypeformResponse`: Contains the generated Typeform form URL and form ID.
    """
    survey_request = {}
    survey_request["title"] = "InsightHounds Survey"
    survey_request["questions"] = generate_questionnaire(vision, mission, description, domain)

    typeform_data = create_typeform_aggregate_definition(survey_request)

    with httpx.Client() as client:
        response = client.post(
            TYPEFORM_API_URL,
            json=typeform_data,
            headers={
                "Authorization": f"Bearer {TYPEFORM_API_TOKEN}",
                "Content-Type": "application/json"
            },
            timeout=30.0
        )

        typeform_response = response.json()

        response = {
            "questions": survey_request["questions"],
            "form_url": typeform_response["_links"]["display"],
            "form_id": typeform_response["id"]
        }
        return response
        
async def generate_typeform_responses(questionnaire_data, form_id):
    """
    Fetches responses to a Typeform survey and calculates the frequency of answers for each question.

    This function retrieves responses for a specific Typeform form using the Typeform API.
    It maps the retrieved answers to their corresponding questions and calculates option 
    frequencies based on the responses.

    Parameters:
        questionnaire_data (list[dict]): A list of dictionaries representing the questionnaire, 
            where each dictionary includes question text and options.
        form_id (str): The unique Typeform form ID for which responses will be fetched.

    Returns:
        list[ResponseFrequency]: A list of `ResponseFrequency` objects containing:
            - `question_text` (str): The text of the question.
            - `options` (dict): A dictionary with option labels as keys and response counts as values.
    """
    question_mapping = {str(idx): question for idx, question in enumerate(questionnaire_data)}

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{TYPEFORM_API_URL}/{form_id}/responses?page_size=50&since=2024-01-01T00:00:00Z&workspace_id=QDcqdz",
            headers={
                "Authorization": f"Bearer {TYPEFORM_API_TOKEN}",
                "Content-Type": "application/json"
            },
            timeout=30.0
        )

        typeform_responses = response.json()

        question_refs = {}
        if typeform_responses.get('items'):
            first_response = typeform_responses['items'][0]
            for answer in first_response.get('answers', []):
                question_ref = answer['field'].get('ref')
                question_id = answer['field'].get('id')
                question_text = question_ref or question_id
                question_refs[question_ref] = question_text

        response_frequencies = []
        option_frequencies = {str(idx): {} for idx in range(len(questionnaire_data))}

        for item in typeform_responses.get('items', []):
            for answer in item.get('answers', []):
                question_ref = str(list(question_refs.keys()).index(answer['field'].get('ref')))
                option_label = answer.get('choice', {}).get('label', 'Unknown')
                
                if question_ref in option_frequencies:
                    option_frequencies[question_ref][option_label] = \
                        option_frequencies[question_ref].get(option_label, 0) + 1

        for ref, frequencies in option_frequencies.items():
            question_details = question_mapping.get(ref, {})

            full_frequencies = {
                option: frequencies.get(option, 0) 
                for option in question_details.get('questionOptions', [])
            }

            response_frequencies.append(
                ResponseFrequency(
                    question_text=question_details.get('questionText', f'Question {ref}'),
                    options=full_frequencies
                )
            )
        
        return response_frequencies