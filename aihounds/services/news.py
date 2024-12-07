import requests
from datetime import datetime
from aihounds.constants.hound import BASE_URL, NEWS_API_KEY
from dateutil.relativedelta import relativedelta
from langchain_core.tools import tool

@tool
def generate_news(company_name:str):
    """
    Fetch news articles based on a query and current system date.
    :param request: Body containing the search query.
    :return: JSON response with news articles.
    """
    query = company_name
    from_date = datetime.now() - relativedelta(months=1)
    from_date_str = from_date.strftime("%Y-%m-%d")
    url = f"{BASE_URL}?q={query}&from={from_date_str}&sortBy=publishedAt&apiKey={NEWS_API_KEY}&language=en"
    print(url)
    response = requests.get(url)

    if response.status_code != 200:
        return None

    return response.json()