from aihounds.constants.hound import SERPAPI_KEY
from serpapi import GoogleSearch
from langchain_core.tools import tool

@tool
def get_trends_search(query,geo):
    """
    Fetches Google Trends data for a specific query and geographic region.

    This function uses the SERP API with the `google_trends` engine to fetch 
    data on regional interest levels for a given search query. The results
    include details about the location, interest value, and geographic coordinates.

    Args:
        query (str): The search query to analyze.
        geo (str): The geographical code (e.g., "IN" for India) to specify the region for trends.

    Returns:
        List[dict]: A list of dictionaries representing interest levels by region. Each dictionary includes:
            - `coordinates` (dict): Contains `lat` (latitude) and `lng` (longitude).
            - `location` (str): The name of the location.
            - `max_value_index` (int): The index of the maximum value.
            - `value` (str): The interest value as a string.
            - `extracted_value` (int): The numeric value of the interest level.

    Note:
        If the SERP API does not return data, a default set of results is provided.
    """
    params = {
        "engine": "google_trends",
        "q": query,
        "geo": geo,
        "region": "CITY",
        "data_type": "GEO_MAP_0",
        "api_key": SERPAPI_KEY
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    interest_by_region = results.get("interest_by_region",
                                     [
                                         {
                                             "coordinates":
                                                 {
                                                     "lat":
                                                         31.2539259,
                                                     "lng":
                                                         75.7240654
                                                 },
                                             "location":
                                                 "Sapror",
                                             "max_value_index":
                                                 0,
                                             "value":
                                                 "100",
                                             "extracted_value":
                                                 100
                                         },
                                         {
                                             "coordinates":
                                                 {
                                                     "lat":
                                                         12.8109999,
                                                     "lng":
                                                         80.0305118
                                                 },
                                             "location":
                                                 "Kattankulathur",
                                             "max_value_index":
                                                 0,
                                             "value":
                                                 "66",
                                             "extracted_value":
                                                 66
                                         }
                                     ])
    return interest_by_region
