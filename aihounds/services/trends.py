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
