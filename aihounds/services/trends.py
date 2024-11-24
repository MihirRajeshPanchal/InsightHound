from aihounds.constants.hound import SERPAPI_KEY
from serpapi import GoogleSearch

def get_trends_search(query):
    params = {
    "engine": "google_trends",
    "q": query,
    "geo": "IN",
    "region": "CITY",
    "data_type": "GEO_MAP_0",
    "api_key": SERPAPI_KEY
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    interest_by_region = results["interest_by_region"]
    return interest_by_region