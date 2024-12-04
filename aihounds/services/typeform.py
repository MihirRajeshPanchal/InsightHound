from aihounds.models.typeform import SurveyRequest

async def create_typeform_definition(survey_request: SurveyRequest) -> dict:
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
                "title": question.questionText,
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