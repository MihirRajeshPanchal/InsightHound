from fastapi import APIRouter, HTTPException
import requests
from datetime import datetime
from aihounds.constants.hound import BASE_URL, NEWS_API_KEY
from aihounds.constants.hound import mongo_client
from aihounds.models.news import NewsRequest
from dateutil.relativedelta import relativedelta

router = APIRouter()

@router.post("/news")
async def fetch_news(request: NewsRequest):
    """
    Fetch news articles based on a query and current system date.
    :param request: Body containing the search query.
    :return: JSON response with news articles.
    """
    company_data = mongo_client.read("company", request.id)
    query = company_data['name']
    from_date = datetime.now() - relativedelta(months=1)
    from_date_str = from_date.strftime("%Y-%m-%d")
    url = f"{BASE_URL}?q={query}&from={from_date_str}&sortBy=publishedAt&apiKey={NEWS_API_KEY}&language=en"
    print(url)
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching news data")

    return response.json()