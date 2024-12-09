import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from typing import List, Optional
import re
from langchain.output_parsers import OutputFixingParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.tools import tool
from aihounds.constants.outreach import LINKEDIN_PROMPT
from aihounds.models.outreach import LinkedInLLMResponse
from aihounds.endpoints.rivals import search_companies
from aihounds.constants.hound import mongo_client

load_dotenv()
import os
from aihounds.constants.prompt import prompt_template, generate_message_prompt
from aihounds.constants.hound import openai_llm, mongo_client

api_key = os.getenv("UNIPILE_API_KEY")


class LinkedinOutreach:
    def __init__(self):
        self.api_key = os.getenv("UNIPILE_API_KEY")
        self.url = "https://api2.unipile.com:13255/api/v1"
        self.mongoose_client = mongo_client

    def get_text(self, url):
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, "html.parser")
            texts = soup.stripped_strings
            chain = prompt_template | openai_llm
            data = " ".join(texts)
            try:
                persona = chain.invoke({"texts": data})
            except Exception as e:
                print(e)
            print(persona.content)
            return persona.content
        except Exception as e:
            return str(e)

    def extract_profile_identifier(self, linkedin_url):
        regex = r"linkedin\.com\/in\/([a-zA-Z0-9-]+)"
        match = re.search(regex, linkedin_url)
        if match:
            return match.group(1)
        else:
            return None

    def get_provider_id(self, account_id, profile_identifier):
        base_url = f"{self.url}/users"
        url = f"{base_url}/{profile_identifier}?account_id={account_id}"
        headers = {"accept": "application/json", "X-API-KEY": self.api_key}
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            data = response.json()
            print(data.get("provider_id", "NOT found"))
            return data.get("provider_id", ""), data.get("headline", "")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return None

    def send_message(self, account_id, provider_id, message):
        try:
            url = f"{self.url}/chats"
            payload = {
                "attendees_ids": (None, provider_id),
                "account_id": (None, account_id),
                "text": (None, message),
            }
            headers = {"accept": "application/json", "X-API-KEY": self.api_key}
            response = requests.post(url, files=payload, headers=headers)
            response.raise_for_status()
            api_data = response.json()
            return api_data
        except Exception as e:
            print(e)
            return None

    def generate_message(self, user_id, domain):
        user = self.mongoose_client.read("user", user_id)
        companyId = user.get("companyId")
        company = self.mongoose_client.read("company", companyId)
        persona = self.get_text(domain)
        chain = generate_message_prompt | openai_llm
        message = chain.invoke({"props": company.get("props"), "persona": persona})
        message = message.content
        return message

    def send_message_linkedin(self, account_id, message, linkedin_url):
        profile_identifier = self.extract_profile_identifier(linkedin_url)
        provider_id, headline = self.get_provider_id(account_id, profile_identifier)
        return self.send_message(account_id, provider_id, message)

    def send_message_to_all(self, account_id, message, linkedin_urls):
        try:
            for url in linkedin_urls:
                self.send_message_linkedin(account_id, message, url)
            return "Messages sent successfully"
        except Exception as e:
            return e


def extract_profile_identifier(url):
    patterns = [
        r"linkedin\.com/company/([^/]+)(?:/.*)?$",  # Standard company URL
        r"linkedin\.com/companies/([^/]+)(?:/.*)?$",  # Alternate format
        r"linkedin\.com/in/company/([^/]+)(?:/.*)?$",  # Potential variant
    ]

    url = url.lower().replace("https://", "").replace("http://", "").rstrip("/")

    # Try each pattern
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            # Decode URL-encoded characters and replace hyphens with spaces
            company_name = match.group(1)
            # company_name = company_name.replace('-', ' ')
            return company_name

    return None


def get_company_profile(data, account_id="AZ2SmGEtRy67LoBqXB0KDQ"):

    identifier = extract_profile_identifier(data.get("linkedin_url"))
    url = f"https://api2.unipile.com:13255/api/v1/linkedin/company/{identifier}?account_id={account_id}"
    headers = {"accept": "application/json", "X-API-KEY": api_key}

    company_linkedin_data = requests.get(url, headers=headers).json()
    print(company_linkedin_data)
    if "viewer_permissions" in company_linkedin_data:
        del company_linkedin_data["viewer_permissions"]
    if "localised_name" in company_linkedin_data:
        del company_linkedin_data["localised_name"]
    if "localised_tagline" in company_linkedin_data:
        del company_linkedin_data["localised_tagline"]
    if "localised_description" in company_linkedin_data:
        del company_linkedin_data["localised_description"]
    data["company_information"] = company_linkedin_data
    id = company_linkedin_data.get("id")
    print(id)
    posts_url = f"https://api2.unipile.com:13255/api/v1/users/{id}/posts?account_id={account_id}"

    # posts_data = requests.get(posts_url, headers=headers).json()
    # print(posts_data)
    # data["company_posts"] = posts_data.get("items", None)
    return company_linkedin_data


def get_company_profile_from_url(linkedin_url, account_id="AZ2SmGEtRy67LoBqXB0KDQ"):

    linkedin_url = extract_profile_identifier(linkedin_url)
    print(linkedin_url, "Inside get company from url")
    url = f"https://api2.unipile.com:13255/api/v1/linkedin/company/{linkedin_url}?account_id={account_id}"
    headers = {"accept": "application/json", "X-API-KEY": api_key}
    data = {}
    company_linkedin_data = requests.get(url, headers=headers).json()
    print(company_linkedin_data)
    if "viewer_permissions" in company_linkedin_data:
        del company_linkedin_data["viewer_permissions"]
    if "localised_name" in company_linkedin_data:
        del company_linkedin_data["localised_name"]
    if "localised_tagline" in company_linkedin_data:
        del company_linkedin_data["localised_tagline"]
    if "localised_description" in company_linkedin_data:
        del company_linkedin_data["localised_description"]
    data["company_information"] = company_linkedin_data
    id = company_linkedin_data.get("id")
    print(id)
    posts_url = f"https://api2.unipile.com:13255/api/v1/users/{id}/posts?account_id={account_id}"
    return company_linkedin_data


@tool
def generate_rivals(
    num_employees_ranges: List[str],
    locations: List[str],
    keyword_tags: Optional[List[str]],
):
    """
    Retrieve rival companies based on specified criteria using LinkedIn company search.

    This tool function helps identify potential rival companies by searching through
    company profiles based on employee count, geographical locations, and optional
    keyword tags. It performs a comprehensive search and enriches each company's
    profile with additional LinkedIn data.

    Args:
        num_employees_ranges (List[str]): A list of employee count ranges to filter companies.

        locations (List[str]): A list of geographic locations to search for companies.
            Can include cities, states, countries, or regions.


        keyword_tags (Optional[List[str]], optional): A list of keywords or tags to
            further refine the company search. Defaults to None.


    Returns:
        List[Dict]: A list of rival company profiles, where each profile includes:
        )
    """
    data = search_companies(num_employees_ranges, locations, keyword_tags)
    rivals_data = []
    for company in data:
        rivals_data.append(get_company_profile(company, "AZ2SmGEtRy67LoBqXB0KDQ"))
    return rivals_data


@tool
def generate_rivals_by_url(
    linkedin_url: str,
):
    """
    Retrieve a  company's information based on their  LinkedIn company Url.

    This tool function helps you get the company information by searching through
    company profiles based on linkedin url
    Args:
        linkedin_url (str): The LinkedIn URL of the company to search for rivals.

    Returns:
        Dict: A company profile

    """

    return get_company_profile_from_url(linkedin_url, "AZ2SmGEtRy67LoBqXB0KDQ")


@tool
def generate_linkedin(purpose):
    """
    Generates LinkedIn-related content, such as email templates and subjects,
    based on the provided purpose.

    Parameters:
        purpose (str): The specific purpose for generating the LinkedIn content.

    Returns:
        LinkedInResponse: A response object containing:
            - subject (str): The subject line for the LinkedIn-related content.
            - email_template (str): A detailed email template for LinkedIn outreach.
    """
    chain = (
        LINKEDIN_PROMPT
        | openai_llm
        | OutputFixingParser.from_llm(
            parser=JsonOutputParser(pydantic_object=LinkedInLLMResponse), llm=openai_llm
        )
    )

    result = chain.invoke({"purpose": purpose})
    print(result)

    message = result.get("message", [])
    return LinkedInLLMResponse(message=message).model_dump()


def get_rivals_test(
    num_employees_ranges: List[str],
    locations: List[str],
    keyword_tags: Optional[List[str]],
):
    """
    Retrieve rival companies based on specified criteria using LinkedIn company search.

    This tool function helps identify potential rival companies by searching through
    company profiles based on employee count, geographical locations, and optional
    keyword tags. It performs a comprehensive search and enriches each company's
    profile with additional LinkedIn data.

    Args:
        num_employees_ranges (List[str]): A list of employee count ranges to filter companies.
            Example formats: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000"]

        locations (List[str]): A list of geographic locations to search for companies.
            Can include cities, states, countries, or regions.
            Example: ["San Francisco", "California", "United States"]

        keyword_tags (Optional[List[str]], optional): A list of keywords or tags to
            further refine the company search. Defaults to None.
            Example: ["technology", "software", "startup", "AI"]

    Returns:
        List[Dict]: A list of rival company profiles, where each profile includes:
            - Basic company information
            - Detailed LinkedIn company profile data
            - Recent company posts
            - Original search criteria match details
        )
    """
    data = search_companies(num_employees_ranges, locations, keyword_tags)
    rivals_data = []
    for company in data:
        rivals_data.append(get_company_profile(company, "Axq_BT2xSrilkSRtXGW8AQ"))
    return rivals_data


def get_self(id, linkedin_url):

    try:
        data = get_company_profile_from_url(linkedin_url, "Axq_BT2xSrilkSRtXGW8AQ")
        return mongo_client.update("company", id, {"props": data})
    except Exception as e:
        print(f"Error: {e}")
        return None
